"use strict";

const constants = require("./constants");
const environment = require("./environment");

module.exports = {
  async init() {
    if (
      environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES ||
      environment.database.dialect === constants.SUPPORTED_DATABASE.SQLITE
    ) {
      const { sequelize } = require("../orm/sequelize/sequelize");
      try {
        if (
          environment.NODE_ENV !== "production" &&
          environment.database.forceDrop === true
        )
          await sequelize.sync({ force: true });
        else await sequelize.sync();

        console.log("Connection to DB has been established successfully.");
      } catch (err) {
        console.error("Unable to connect to the database:", err);
      }
    }
  },
};
