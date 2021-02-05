"use strict";

function buildBeans() {
  const UserRepositoryPostgres = require("../repositories/ClientRepositoryPostgres");

  const beans = {
    userRepository: new UserRepositoryPostgres(),
  };

  return beans;
}

module.exports = buildBeans();
