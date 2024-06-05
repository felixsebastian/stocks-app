import express from "express";
import cors from "cors";
import companies from "./companies/routes";

const app = express();
const port = 47582;
app.use(cors({ origin: "http://localhost:50749" }));
app.use(express.json());
const routes = [companies];
routes.forEach((route) => route(app));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
