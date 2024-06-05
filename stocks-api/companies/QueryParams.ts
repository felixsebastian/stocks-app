import paramsSchema from "./paramsSchema";
import { z } from "zod";

type QueryParams = z.infer<typeof paramsSchema>;

export default QueryParams;
