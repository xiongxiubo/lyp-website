interface CooperationSubmission {
  type?: "city" | "scenic";
  city?: string;
  scenicName?: string;
  contact?: string;
  contactMethod?: string;
  introduction?: string;
  website?: string;
}

const recentSubmissions = new Map<string, number[]>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CooperationSubmission>(event);

  if (clean(body.website, 200)) return { ok: true };

  const type = body.type;
  const city = clean(body.city, 60);
  const scenicName = clean(body.scenicName, 80);
  const contact = clean(body.contact, 40);
  const contactMethod = clean(body.contactMethod, 80);
  const introduction = clean(body.introduction, 500);

  if (
    !["city", "scenic"].includes(type || "") ||
    !city ||
    (type === "scenic" && !scenicName) ||
    !contact ||
    !contactMethod ||
    !introduction
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "请完整填写合作信息。",
    });
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const now = Date.now();
  const attempts = (recentSubmissions.get(ip) || []).filter(
    (timestamp) => now - timestamp < 60_000,
  );
  if (attempts.length >= 3) {
    throw createError({
      statusCode: 429,
      statusMessage: "提交过于频繁，请稍后再试。",
    });
  }
  const config = useRuntimeConfig(event);
  if (!config.cooperationWebhookUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: "合作信息提交通道尚未配置，请稍后再试。",
    });
  }

  const submission = {
    type,
    typeLabel: type === "scenic" ? "景区运营方" : "城市代理商",
    city,
    scenicName: type === "scenic" ? scenicName : undefined,
    contact,
    contactMethod,
    introduction,
    submittedAt: new Date().toISOString(),
    userAgent: getHeader(event, "user-agent") || "",
  };

  try {
    await $fetch(config.cooperationWebhookUrl, {
      method: "POST",
      body: submission,
      timeout: 10_000,
    });
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "提交通道暂时不可用，请稍后再试。",
    });
  }

  recentSubmissions.set(ip, [...attempts, now]);

  return { ok: true };
});
