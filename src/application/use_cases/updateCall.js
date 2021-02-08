"use strict";

const Call = require("../../domain/Call");

module.exports = async (
  callId,
  cpf,
  name,
  description,
  status,
  { callRepository, clientRepository }
) => {
  const error = new Error("");
  const client = await clientRepository.getByCpf(cpf);

  if (!client) {
    error.code = 400;
    error.path = "cpf";
    error.message = "Nenhum cliente com este cpf!";
    throw error;
  }

  const call = new Call(callId, client.id, name, description, status);

  return callRepository.merge(call);
};
