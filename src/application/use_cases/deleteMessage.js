"use strict";

module.exports = async (messageId, { messageRepository }) => {
  return messageRepository.remove(messageId);
};
