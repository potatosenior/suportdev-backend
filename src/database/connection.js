const { Sequelize } = require("sequelize");
const configs = require("./config/config");

const config = process.env.NODE_ENV
  ? configs[process.env.NODE_ENV]
  : configs["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  }
);

module.exports = sequelize;
