"use strict";

module.exports = async (callId, { callRepository }) => {
  return callRepository.get(callId).catch(error => {
    throw error;
  });
};
