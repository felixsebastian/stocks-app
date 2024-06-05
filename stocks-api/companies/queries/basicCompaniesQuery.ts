import db from "../../db";

export default (exchange: string, scoreFilter: string) => {
  const query = db
    .with("lastPrices", (qb) =>
      qb
        .select("company_id", "price AS last_price", "date AS last_price_date")
        .from("swsCompanyPriceClose")
        .groupBy("company_id")
        .orderBy("date_created"),
    )
    .select(
      "swsCompany.id",
      "name",
      "ticker_symbol",
      "exchange_country_iso",
      "exchange_symbol",
      "last_price",
      "last_price_date",
      "total AS snowflake_score",
      db.raw("COUNT(*) OVER() AS total_companies"),
    )
    .from("swsCompany")
    .leftJoin("swsCompanyScore", "swsCompany.id", "swsCompanyScore.company_id");

  if (exchange !== "none") query.where("exchange_symbol", "=", exchange);

  if (scoreFilter !== "none") {
    query.where("snowflake_score", ">", parseInt(scoreFilter.slice(3), 10));
  }

  return query;
};
