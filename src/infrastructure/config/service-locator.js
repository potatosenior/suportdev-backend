"use strict";

function buildBeans() {
  const ClientRepositoryPostgres = require("../repositories/ClientRepositoryPostgres");
  const CallRepositoryPostgres = require("../repositories/CallRepositoryPostgres");
  const MessageRepositoryPostgres = require("../repositories/MessageRepositoryPostgres");
  // const ClientSerializer = require("../../interfaces/serializers/ClientSerializer");

  const beans = {
    clientRepository: new ClientRepositoryPostgres(),
    callRepository: new CallRepositoryPostgres(),
    messageRepository: new MessageRepositoryPostgres(),
    // clientSerializer: new ClientSerializer(),
  };

  return beans;
}

module.exports = buildBeans();
