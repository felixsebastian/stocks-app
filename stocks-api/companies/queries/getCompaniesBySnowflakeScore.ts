import includePrices from "./includePrices";
import includeVolatility from "./includeVolatility";
import basicCompaniesQuery from "./basicCompaniesQuery";
import QueryParams from "../QueryParams";
import { CompanyRow } from "./types";

export default async (params: QueryParams) => {
  const companies: CompanyRow[] = await basicCompaniesQuery(
    params.exchange,
    params.scoreFilter,
  )
    .orderBy("snowflake_score", "DESC")
    .orderBy("name", "ASC")
    .limit(params.limit)
    .offset(params.limit * params.offset);

  return await includeVolatility(await includePrices(companies));
};
