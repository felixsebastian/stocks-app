/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "../db";
import { first, last, omit, sortBy as sort } from "lodash";
import { std } from "mathjs";
import QueryParams from "./QueryParams";

const basicCompaniesQuery = (exchange: string, scoreFilter: string) => {
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
      db.raw("count(*) OVER() AS total_companies"),
    )
    .from("swsCompany")
    .leftJoin("lastPrices", function () {
      this.on("swsCompany.id", "=", "lastPrices.company_id");
    })
    .leftJoin("swsCompanyScore", function () {
      this.on("swsCompany.id", "=", "swsCompanyScore.company_id");
    });

  if (exchange !== "none") {
    query.where("exchange_symbol", "=", exchange);
  }

  if (scoreFilter !== "none") {
    query.where("snowflake_score", ">", parseInt(scoreFilter.slice(3), 10));
  }

  return query;
};

const includePrices = async (companies: any[]) => {
  const ids = companies.map((c) => c.id);

  const prices = await db
    .select("company_id", "price", "date")
    .from("swsCompanyPriceClose")
    .whereIn("company_id", ids)
    .orderBy("company_id", "ASC")
    .orderBy("date", "DESC");

  const companyPrices = prices.reduce((result, next) => {
    if (!result[next.company_id]) result[next.company_id] = [];
    result[next.company_id].push([next.date, next.price]);
    return result;
  }, {});

  companies.forEach((c) => (c.price_history = companyPrices[c.id]));
};

const includeVolatility = (companies: any[]) => {
  for (const c of companies) {
    c.volatility = std(c.price_history.map(last));
  }
};

export const getCompaniesQuery = async (params: QueryParams) => {
  const { sortBy } = params;
  let companies: any[];

  if (sortBy === "snowflake_score") {
    companies = await basicCompaniesQuery(params.exchange, params.scoreFilter)
      .orderBy("snowflake_score", "DESC")
      .orderBy("name", "ASC")
      .limit(params.limit)
      .offset(params.limit * params.offset);
  } else {
    companies = await basicCompaniesQuery(
      params.exchange,
      params.scoreFilter,
    ).orderBy("name", "ASC");
  }

  await includePrices(companies);
  includeVolatility(companies);

  if (sortBy === "volatility") {
    companies = sort(companies, (c) => -c.volatility);
    companies = companies.slice(params.offset, params.offset + params.limit);
  }

  const fieldsToOmit = ["total_companies"];
  if (!params.includePrices) fieldsToOmit.push("price_history");

  return {
    items: companies.map((c) => omit(c, fieldsToOmit)),
    total_items: first(companies)?.total_companies ?? 0,
  };
};
