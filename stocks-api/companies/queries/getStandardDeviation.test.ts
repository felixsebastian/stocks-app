import getStandardDeviation from "./getStandardDeviation";

describe("getStandardDeviation", () => {
  it("should give the standard deviation", () => {
    expect(getStandardDeviation([1, 2, 3])).toBeCloseTo(0.816);
  });
});
