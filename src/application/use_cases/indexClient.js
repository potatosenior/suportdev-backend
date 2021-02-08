"use strict";

module.exports = async ({ clientRepository }) => {
  return clientRepository.find();
};
