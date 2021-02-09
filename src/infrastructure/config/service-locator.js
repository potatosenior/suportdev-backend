"use strict";

function buildBeans() {
  const ClientRepositoryPostgres = require("../repositories/ClientRepositoryPostgres");
  const CallRepositoryPostgres = require("../repositories/CallRepositoryPostgres");
  const MessageRepositoryPostgres = require("../repositories/MessageRepositoryPostgres");
  const JwtAccessTokenManager = require("../security/JwtAccessTokenManager");
  const BycriptHashManager = require("../security/BycriptHashManager");
  // const ClientSerializer = require("../../interfaces/serializers/ClientSerializer");

  const beans = {
    clientRepository: new ClientRepositoryPostgres(),
    callRepository: new CallRepositoryPostgres(),
    messageRepository: new MessageRepositoryPostgres(),
    accessTokenManager: new JwtAccessTokenManager(),
    hashManager: new BycriptHashManager(),
    // clientSerializer: new ClientSerializer(),
  };

  return beans;
}

module.exports = buildBeans();
