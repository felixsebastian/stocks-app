import getStandardDeviation from "./getStandardDeviation";
import { CompanyRow, WithPriceHistory, WithVolatility } from "./types";

const includeVolatility = async (
  companies: (CompanyRow & WithPriceHistory)[],
) => {
  for (const company of companies) {
    (company as CompanyRow & WithPriceHistory & WithVolatility).volatility =
      getStandardDeviation(company.price_history.map((i) => i[1]));
  }

  return companies as (CompanyRow & WithPriceHistory & WithVolatility)[];
};

export default includeVolatility;
