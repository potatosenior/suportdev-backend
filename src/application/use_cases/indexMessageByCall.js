"use strict";

module.exports = async (callId, { messageRepository }) => {
  return messageRepository.findByCallId(callId);
};
