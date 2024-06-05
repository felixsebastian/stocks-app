import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./sws.sqlite3",
  },
});

export default db;
