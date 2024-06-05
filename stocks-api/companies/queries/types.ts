export type PriceHistory = [string, number];

export interface BasicCompany {
  id: string;
  name: string;
  ticker_symbol: string;
  exchange_country_iso: string;
  exchange_symbol: string;
  last_price: number;
  last_price_date: string;
  snowflake_score: number;
}

export interface CompanyRow extends BasicCompany {
  total_companies: number;
}

export interface FinalCompany extends BasicCompany {
  price_history: PriceHistory[];
  volatility: number;
}
