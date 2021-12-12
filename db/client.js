require("dotenv").config();
const { Client } = require("pg");
const { DB_PORT, DB_PASS } = process.env;

const CONNECTION_STRING = {
  host: "localhost",
  user: "postgres",
  port: DB_PORT,
  password: DB_PASS,
  database: "points",
};
const client = new Client(CONNECTION_STRING);

module.exports = client;
