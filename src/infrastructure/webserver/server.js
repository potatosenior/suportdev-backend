"use strict";

const express = require("express");
const cors = require("cors");
const routes = require("../../interfaces/routes/routes");

const createServer = async () => {
  const server = express();
  const port = process.env.PORT || 3000;

  server.use(express.json());
  server.use(cors());
  server.use(routes);
  console.log("server started on: http://localhost:" + port);
  return server.listen(port);
};

module.exports = createServer;
