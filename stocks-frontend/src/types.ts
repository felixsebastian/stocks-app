export type SortBy = "snowflake_score" | "volatility";

export interface Company {
  id: string;
  name: string;
  ticker_symbol: string;
  exchange_country_iso: string;
  exchange_symbol: string;
  last_price: number;
  last_price_date: string;
  snowflake_score: number;
  volatility: number;
}

export interface Paginated<T> {
  items: T[];
  total_items: number;
}
