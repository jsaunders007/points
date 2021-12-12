const express = require("express");
require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./api");
const client = require("./db/client");
const jwt = require("jsonwebtoken");

const { getUser } = require("./db/users");

const server = express();

server.use(cors());
server.use(express.json());

server.use(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    return next();
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await getUser(decodedToken.username);
  delete user.password;
  req.user = user;
  return next();
});

server.use("./api", apiRouter);

server.listen(process.env.PORT || 3000, () => {
  client.connect();
  console.log("Server is up!");
});
