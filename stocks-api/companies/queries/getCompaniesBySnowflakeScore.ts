import includePrices from "./includePrices";
import includeVolatility from "./includeVolatility";
import basicCompaniesQuery from "./basicCompaniesQuery";
import QueryParams from "../QueryParams";
import { CompanyRow } from "./types";

const getCompaniesBySnowflakeScore = async (params: QueryParams) => {
  const companies: CompanyRow[] = await basicCompaniesQuery(
    params.exchange,
    params.scoreFilter,
  )
    .orderBy("snowflake_score", "DESC")
    .orderBy("name", "ASC")
    .limit(params.limit)
    .offset(params.limit * params.offset);

  const companiesWithPrices = await includePrices(companies);
  return await includeVolatility(params, companiesWithPrices);
};

export default getCompaniesBySnowflakeScore;
