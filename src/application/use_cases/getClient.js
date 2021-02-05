"use strict";

module.exports = async (userId, { userRepository }) => {
  return userRepository.get(userId).catch(error => {
    throw error;
  });
};
