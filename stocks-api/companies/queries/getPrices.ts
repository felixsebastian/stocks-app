import db from "../../db";

interface CompanyPrice {
  company_id: string;
  price: number;
  date: string;
}

export default (ids: string[]): Promise<CompanyPrice[]> =>
  db
    .select("company_id", "price", "date")
    .from("swsCompanyPriceClose")
    .whereIn("company_id", ids)
    .orderBy("company_id", "ASC")
    .orderBy("date", "DESC");
