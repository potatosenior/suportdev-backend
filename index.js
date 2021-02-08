"use strict";

const bootstrap = require("./src/infrastructure/config/bootstrap");
const createServer = require("./src/infrastructure/webserver/server");

// Start the server
const start = async () => {
  try {
    await bootstrap.init();
    await createServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
