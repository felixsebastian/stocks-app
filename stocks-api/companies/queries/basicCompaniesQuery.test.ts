import basicCompaniesQuery from "./basicCompaniesQuery";

describe("basicCompaniesQuery", () => {
  it("should include the exchange filter", () => {
    expect(
      basicCompaniesQuery("some exchange", "none").toString(),
    ).toMatchSnapshot();
  });

  it("should include the score filter", () => {
    expect(
      basicCompaniesQuery("none", "some score filter").toString(),
    ).toMatchSnapshot();
  });
});
