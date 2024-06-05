import { first } from "lodash";
import { companyRow } from "../../tests/fixtures";
import includeVolatility from "./includeVolatility";
import { PriceHistory } from "./types";

const priceHistory: PriceHistory[] = [
  ["1/1/1970", 10],
  ["2/1/1970", 12],
  ["3/1/1970", 6],
];

const companyWithPriceHistory = {
  ...companyRow,
  price_history: priceHistory,
};

describe("includeVolatility", () => {
  it("should enrich the companies with a price_history field", async () => {
    const company = first(await includeVolatility([companyWithPriceHistory]));
    expect(company).toHaveProperty("volatility");
    expect(company?.volatility).toBeCloseTo(2.494);
  });
});
