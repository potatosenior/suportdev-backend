"use strict";

function buildBeans() {
  const ClientRepositoryPostgres = require("../repositories/ClientRepositoryPostgres");
  const ClientSerializer = require("../../interfaces/serializers/ClientSerializer");

  const beans = {
    userRepository: new ClientRepositoryPostgres(),
    clientSerializer: new ClientSerializer(),
  };

  return beans;
}

module.exports = buildBeans();
