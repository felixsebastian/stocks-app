import db from "../../db";
import { PriceHistory } from "./types";

interface Company {
  id: string;
}

interface CompanyPrice {
  company_id: string;
  price: number;
  date: string;
}

export default async <T extends Company>(companies: T[]) => {
  const ids = companies.map((c) => c.id);

  const prices: CompanyPrice[] = await db
    .select("company_id", "price", "date")
    .from("swsCompanyPriceClose")
    .whereIn("company_id", ids)
    .orderBy("company_id", "ASC")
    .orderBy("date", "DESC");

  const companyPrices = prices.reduce<Record<string, PriceHistory[]>>(
    (result, next) => {
      if (!result[next.company_id]) result[next.company_id] = [];
      result[next.company_id].push([next.date, next.price]);
      return result;
    },
    {},
  );

  type WithPriceHistory<T> = T & {
    price_history: PriceHistory[];
  };

  for (const company of companies) {
    (company as WithPriceHistory<T>).price_history = companyPrices[company.id];
  }

  return companies as WithPriceHistory<T>[];
};
