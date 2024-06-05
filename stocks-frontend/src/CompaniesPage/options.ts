export const sortByOptions = [
  { key: "snowflake_score", label: "Snowflake score" } as const,
  { key: "volatility", label: "Volatility" } as const,
];

export const snowflakeScoreOptions = [
  { key: "none", label: "Any" } as const,
  { key: "gt_20", label: "20+" } as const,
  { key: "gt_15", label: "15+" } as const,
  { key: "gt_10", label: "10+" } as const,
  { key: "gt_5", label: "5+" } as const,
];
