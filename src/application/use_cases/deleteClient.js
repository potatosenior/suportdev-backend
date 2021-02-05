"use strict";

module.exports = async (clientId, { userRepository }) => {
  return userRepository.remove(clientId);
};
