import z from "zod";

const paramsSchema = z.object({
  sortBy: z.enum(["snowflake_score", "volatility"]).default("snowflake_score"),
  exchange: z
    .string()
    .regex(/^[a-zA-Z_]+$/)
    .default("none"),
  scoreFilter: z
    .string()
    .regex(/^none|(gt_[0-9]+)$/)
    .default("gt_0"),
  limit: z.coerce.number().default(100),
  offset: z.coerce.number().default(0),
  includePrices: z.enum(["true", "false"]).transform((s) => JSON.parse(s)),
});

export default paramsSchema;
