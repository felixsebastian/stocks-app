import { std } from "mathjs";
import QueryParams from "../QueryParams";
import { PriceHistory } from "./types";

// For some reason this library says it returns a MathNumericType[] but actually it returns a number.
const stdev = (numbers: number[]) => std(numbers) as unknown as number;

interface Company {
  price_history: PriceHistory[];
}

const includeVolatility = async <T extends Company>(
  params: QueryParams,
  companies: T[],
) => {
  type WithVolatility<T> = T & {
    volatility: number;
  };

  for (const company of companies) {
    (company as T & WithVolatility<T>).volatility = stdev(
      company.price_history.map((i) => i[1]),
    );
  }

  const result = companies as WithVolatility<T>[];

  if (params.sortBy === "volatility") {
    result.sort((a, b) => a.volatility - b.volatility);
    result.splice(params.offset, params.offset + params.limit);
  }

  return result;
};

export default includeVolatility;
