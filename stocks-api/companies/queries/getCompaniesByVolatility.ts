import basicCompaniesQuery from "./basicCompaniesQuery";
import includeVolatility from "./includeVolatility";
import QueryParams from "../QueryParams";
import includePrices from "./includePrices";
import { CompanyRow } from "./types";

const getCompaniesByVolatility = async (params: QueryParams) => {
  const companies: CompanyRow[] = await basicCompaniesQuery(
    params.exchange,
    params.scoreFilter,
  ).orderBy("name", "ASC");

  const companiesWithPrices = await includePrices(companies);
  return await includeVolatility(params, companiesWithPrices);
};

export default getCompaniesByVolatility;
