import { first } from "lodash";
import getCompaniesQuery from "./getCompaniesQuery";
import { companyRow } from "../../tests/fixtures";

const getCompaniesBySnowflakeScore = jest.fn();

jest.mock("./getCompaniesBySnowflakeScore", () => ({
  __esModule: true,
  default: () => getCompaniesBySnowflakeScore(),
}));

const getCompaniesByVolatility = jest.fn();

jest.mock("./getCompaniesByVolatility", () => ({
  __esModule: true,
  default: () => getCompaniesByVolatility(),
}));

const params = {
  exchange: "some exchange",
  scoreFilter: "score filter",
  limit: 10,
  offset: 0,
  sortBy: "snowflake_score",
  includePrices: false,
} as const;

describe("getCompaniesQuery", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("when there are no companies", () => {
    jest.resetAllMocks();

    it("should return an empty response", async () => {
      getCompaniesBySnowflakeScore.mockReturnValue(Promise.resolve([]));

      expect(await getCompaniesQuery(params)).toStrictEqual({
        items: [],
        total_items: 0,
      });
    });
  });

  describe("when there are companies", () => {
    it("should move the total_companies field out of the rows", async () => {
      getCompaniesBySnowflakeScore.mockReturnValue(
        Promise.resolve([companyRow]),
      );

      const result = await getCompaniesQuery(params);
      expect(result.total_items).toBe(123);
      expect(first(result.items)).not.toHaveProperty("total_companies");
    });
  });

  describe("when sorting by snowflake score", () => {
    it("should use the correct query", async () => {
      getCompaniesBySnowflakeScore.mockReturnValue(Promise.resolve([]));
      await getCompaniesQuery(params);
      expect(getCompaniesBySnowflakeScore).toHaveBeenCalled();
      expect(getCompaniesByVolatility).not.toHaveBeenCalled();
    });
  });

  describe("when sorting by volatility", () => {
    it("should use the correct query", async () => {
      getCompaniesByVolatility.mockReturnValue(Promise.resolve([]));
      await getCompaniesQuery({ ...params, sortBy: "volatility" });
      expect(getCompaniesBySnowflakeScore).not.toHaveBeenCalled();
      expect(getCompaniesByVolatility).toHaveBeenCalled();
    });
  });

  describe("when include prices param is true", () => {
    it("should include the price_history field", async () => {
      getCompaniesBySnowflakeScore.mockReturnValue(
        Promise.resolve([
          {
            ...companyRow,
            price_history: [["1/1/1970", 123]],
          },
        ]),
      );

      const result = await getCompaniesQuery({
        ...params,
        includePrices: true,
      });

      expect(first(result.items)).toHaveProperty("price_history");
      expect(Array.isArray(first(result.items)?.price_history)).toBe(true);
    });
  });
});
