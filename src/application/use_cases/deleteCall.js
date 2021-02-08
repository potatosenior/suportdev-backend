"use strict";

module.exports = async (callId, { callRepository }) => {
  return callRepository.remove(callId);
};
