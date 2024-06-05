import { getCompaniesQuery } from "./getCompaniesQuery";
import { Express } from "express";
import paramsSchema from "./paramsSchema";
import QueryParams from "./QueryParams";

export default (app: Express) => {
  app.get("/companies", async (req, res) => {
    const params = paramsSchema.parse(req.query) as QueryParams;
    const data = await getCompaniesQuery(params);
    res.send(data);
  });
};
