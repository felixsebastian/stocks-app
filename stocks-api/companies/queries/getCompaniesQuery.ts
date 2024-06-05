import { omit, first } from "lodash";
import QueryParams from "../QueryParams";
import getCompaniesBySnowflakeScore from "./getCompaniesBySnowflakeScore";
import getCompaniesByVolatility from "./getCompaniesByVolatility";
import { CompanyRow, Company } from "./types";

const getCompaniesQuery = async (params: QueryParams) => {
  let companies: CompanyRow[];

  if (params.sortBy === "snowflake_score") {
    companies = await getCompaniesBySnowflakeScore(params);
  } else {
    companies = await getCompaniesByVolatility(params);
  }

  const fieldsToOmit = ["total_companies"];
  if (!params.includePrices) fieldsToOmit.push("price_history");
  const items = companies.map((c) => omit(c, fieldsToOmit)) as Company[];

  return {
    items,
    total_items: first(companies)?.total_companies ?? 0,
  };
};

export default getCompaniesQuery;
