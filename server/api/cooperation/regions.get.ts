import type { CooperationRegion } from "../../../shared/types/cooperation";
import { requestCooperation } from "../../utils/cooperation-upstream";

export default defineEventHandler((event) => requestCooperation<CooperationRegion[]>(event, "regions"));
