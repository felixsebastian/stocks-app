import getCompaniesQuery from "./queries/getCompaniesQuery";
import { Router } from "express";
import paramsSchema from "./paramsSchema";

const router = Router();

router.get("/companies", async (req, res) => {
  const params = paramsSchema.parse(req.query);
  const data = await getCompaniesQuery(params);
  res.send(data);
});

export default router;
