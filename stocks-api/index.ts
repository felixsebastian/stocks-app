import express from "express";
import cors from "cors";
import companiesRouter from "./companies/router";

const app = express();
const port = 47582;
app.use(cors({ origin: "http://localhost:50749" }));
app.use(express.json());
app.use(companiesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
