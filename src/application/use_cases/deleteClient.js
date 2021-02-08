"use strict";

module.exports = async (clientId, { clientRepository }) => {
  return clientRepository.remove(clientId);
};
