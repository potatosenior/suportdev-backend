"use strict";

module.exports = async (userId, { clientRepository }) => {
  return clientRepository.get(userId).catch(error => {
    throw error;
  });
};
