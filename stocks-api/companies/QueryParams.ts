export default interface GetCompaniesQueryParams {
  sortBy: "snowflake_score" | "volatility";
  scoreFilter: string;
  exchange: string;
  limit: number;
  offset: number;
  includePrices: boolean;
}
