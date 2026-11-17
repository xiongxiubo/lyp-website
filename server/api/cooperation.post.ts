import type { CooperationReceipt } from "../../shared/types/cooperation";
import { cooperationBody, cooperationPayload } from "../utils/cooperation-schema";
import { requestCooperation } from "../utils/cooperation-upstream";

export default defineEventHandler(async (event) => {
  const body = cooperationBody(await readBody<unknown>(event));
  if (typeof body.website === "string" && body.website.trim()) return { ok: true };
  const receipt = await requestCooperation<CooperationReceipt>(event, "applications", cooperationPayload(body));
  return { ok: true, ...receipt };
});
