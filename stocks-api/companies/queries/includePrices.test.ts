import { companyRow } from "../../tests/fixtures";
import includePrices from "./includePrices";

const getPrices = jest.fn();

jest.mock("./getPrices", () => ({
  __esModule: true,
  default: () => getPrices(),
}));

describe("includePrices", () => {
  beforeEach(() => {
    getPrices.mockReturnValue(
      Promise.resolve([
        { company_id: "1", date: "1/1/1970", price: 10 },
        { company_id: "1", date: "2/1/1970", price: 12 },
        { company_id: "1", date: "3/1/1970", price: 6 },
      ]),
    );
  });

  it("should enrich the companies with a price_history field", async () => {
    expect(await includePrices([companyRow])).toStrictEqual([
      {
        ...companyRow,
        price_history: [
          ["1/1/1970", 10],
          ["2/1/1970", 12],
          ["3/1/1970", 6],
        ],
      },
    ]);
  });
});
