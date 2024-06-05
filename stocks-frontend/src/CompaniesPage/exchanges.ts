import { Option } from "./Select";

const exchanges = ["ASX", "NYSE", "NasdaqGS"] as const;
export type ExchangeOption = "none" | (typeof exchanges)[number];

export const exchangeOptions = [
  { key: "none", label: "Any" } as const,
  ...exchanges.map((s) => ({
    key: s,
    label: s,
  })),
] as unknown as Option<ExchangeOption>[];
