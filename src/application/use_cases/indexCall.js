"use strict";

module.exports = async ({ callRepository }) => {
  return callRepository.find();
};
