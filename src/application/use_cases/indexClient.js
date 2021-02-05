"use strict";

module.exports = async ({ userRepository }) => {
  return userRepository.find();
};
