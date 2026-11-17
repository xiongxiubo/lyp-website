import { createError, getHeader, getRequestIP, setResponseHeader, type H3Event } from "h3";

interface Envelope<T> {
  code: number;
  data?: T;
  error?: string;
  msg?: string;
}

export function unwrapCooperation<T>(payload: Envelope<T>): T {
  if (!payload || payload.code !== 0 || payload.data === undefined) {
    throw createError({ statusCode: 502, message: "提交通道返回异常，请稍后再试。" });
  }
  return payload.data;
}

export async function requestCooperation<T>(event: H3Event, path: string, body?: Record<string, unknown>): Promise<T> {
  const baseUrl = useRuntimeConfig(event).cooperationApiBaseUrl.trim().replace(/\/+$/, "");
  if (!baseUrl) {
    throw createError({ statusCode: 503, message: "合作信息提交通道尚未配置，请稍后再试。" });
  }
  // Both Caddy entrypoints overwrite X-Real-IP. Nuxt has no public container port.
  const realIP = getHeader(event, "x-real-ip") || "";
  const ip = realIP || getRequestIP(event);
  let payload: Envelope<T>;
  try {
    payload = await $fetch<Envelope<T>>(`${baseUrl}/cooperation/${path}`, {
      method: body ? "POST" : "GET",
      body,
      headers: ip ? { "X-Forwarded-For": ip } : undefined,
      timeout: 10_000,
      retry: 0,
    });
  } catch (error: unknown) {
    const upstream = error as { statusCode?: number; data?: Envelope<unknown>; response?: { headers: Headers } };
    if (upstream.statusCode === 400 || upstream.statusCode === 429) {
      const retryAfter = upstream.response?.headers.get("retry-after");
      if (retryAfter && /^\d+$/.test(retryAfter)) setResponseHeader(event, "Retry-After", Number(retryAfter));
      throw createError({
        statusCode: upstream.statusCode,
        message: upstream.statusCode === 429 ? "提交过于频繁，请稍后再试。" : upstream.data?.error || "请检查并完整填写合作信息。",
      });
    }
    throw createError({ statusCode: 502, message: "提交通道暂时不可用，请稍后再试。" });
  }
  return unwrapCooperation(payload);
}
