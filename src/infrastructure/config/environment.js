"use strict";

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
module.exports = (() => {
  const environment = {
    database: {
      dialect: process.env.DATABASE_DIALECT,
      url: process.env.DATABASE_URI || "",
      database: process.env.DATABASE || "",
      username: process.env.DATABASE_USER || "",
      password: process.env.DATABASE_PASSWORD || "",
      host: process.env.DATABASE_HOST || "",
      port: process.env.DATABASE_PORT || "",
      forceDrop: process.env.DATABASE_FORCE_DROP || false,
      logging: false,
    },
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  };

  if (process.env.NODE_ENV === "test") {
    environment.database = {
      dialect: "sqlite",
      storage: ":memory:",
    };
  }

  return environment;
})();
