import { createError } from "h3";

interface CooperationForm {
  type?: unknown;
  province?: unknown;
  city?: unknown;
  scenicName?: unknown;
  contact?: unknown;
  contactMethod?: unknown;
  introduction?: unknown;
  website?: unknown;
}

export function cooperationBody(body: unknown): CooperationForm {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw createError({ statusCode: 400, message: "合作信息格式无效。" });
  }
  return body as CooperationForm;
}

function text(value: unknown, label: string, maximum: number): string {
  const result = typeof value === "string" ? value.trim() : "";
  if (!result) throw createError({ statusCode: 400, message: `请填写${label}。` });
  if ([...result].length > maximum) throw createError({ statusCode: 400, message: `${label}超过长度限制。` });
  return result;
}

export function cooperationPayload(body: CooperationForm) {
  if (body.type !== "city" && body.type !== "scenic") {
    throw createError({ statusCode: 400, message: "请选择合作类型。" });
  }
  return {
    type: body.type,
    province: text(body.province, "省份", 60),
    city: text(body.city, "城市", 60),
    scenic_name: body.type === "scenic" ? text(body.scenicName, "景区名称", 80) : "",
    contact: text(body.contact, "联系人", 40),
    contact_method: text(body.contactMethod, "联系电话或微信", 80),
    introduction: text(body.introduction, "合作介绍", 500),
    source: "website" as const,
  };
}
