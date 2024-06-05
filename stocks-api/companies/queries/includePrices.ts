import getPrices from "./getPrices";
import { CompanyRow, PriceHistory, WithPriceHistory } from "./types";

const includePrices = async (companies: CompanyRow[]) => {
  const ids = companies.map((c) => c.id);
  const prices = await getPrices(ids);

  const companyPrices = prices.reduce<Record<string, PriceHistory[]>>(
    (result, next) => {
      if (!result[next.company_id]) result[next.company_id] = [];
      result[next.company_id].push([next.date, next.price]);
      return result;
    },
    {},
  );

  for (const company of companies) {
    (company as CompanyRow & WithPriceHistory).price_history! =
      companyPrices[company.id];
  }

  return companies as (CompanyRow & WithPriceHistory)[];
};

export default includePrices;
