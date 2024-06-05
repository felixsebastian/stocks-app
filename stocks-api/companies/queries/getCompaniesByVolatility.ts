import basicCompaniesQuery from "./basicCompaniesQuery";
import includeVolatility from "./includeVolatility";
import QueryParams from "../QueryParams";
import includePrices from "./includePrices";
import { CompanyRow } from "./types";

// When sorting by volatility we need to load all companies into memory first.
// Because the volatility calculation can't be done in SQL (at least not in sqlite).
const getCompaniesByVolatility = async (params: QueryParams) => {
  const companies: CompanyRow[] = await basicCompaniesQuery(
    params.exchange,
    params.scoreFilter,
  ).orderBy("name", "ASC");

  const result = await includeVolatility(await includePrices(companies));

  // So we do the pagination in memory as well.
  result.sort((a, b) => b.volatility - a.volatility);
  return result.slice(params.offset, params.offset + params.limit);
};

export default getCompaniesByVolatility;
