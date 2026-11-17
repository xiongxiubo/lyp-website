export type CooperationType = "city" | "scenic";

export interface CooperationRegion {
  [key: string]: unknown;
  label: string;
  value: string;
  children?: CooperationRegion[];
}

export interface CooperationReceipt {
  id: string;
  created_at: string;
}
