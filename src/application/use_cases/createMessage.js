"use strict";

const Message = require("../../domain/Message");

module.exports = async (callId, content, { messageRepository }) => {
  const msg = new Message(null, callId, content);

  return messageRepository.persist(msg);
};
