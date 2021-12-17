const express = require("express");
require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./api");
const client = require("./db/client");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api", apiRouter);

server.listen(process.env.PORT || 3000, () => {
  client.connect();
  console.log("Server is up!");
});
