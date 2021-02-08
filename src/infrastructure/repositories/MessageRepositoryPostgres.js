"use strict";

const { sequelize } = require("../orm/sequelize/sequelize");
const Message = require("../../domain/Message");

module.exports = class {
  constructor() {
    this.db = sequelize;
    this.model = this.db.model("Message");
  }

  async persist(messageEntity) {
    const { callId, content } = messageEntity;

    try {
      const seqMsg = await this.model.create({
        callId,
        content,
      });

      await seqMsg.save();

      return new Message(seqMsg.id, callId, content);
    } catch (error) {
      error.code = 400;

      throw error;
    }
  }

  async remove(messageId) {
    const seqMsg = await this.model.findByPk(messageId);
    if (seqMsg) {
      return seqMsg.destroy();
    }
    return false;
  }

  async findByCallId(callId) {
    const seqMsgs = await this.model.findAll({
      where: {
        callId,
      },
    });

    return seqMsgs.map(seqMsg => {
      return new Message(
        seqMsg.id,
        seqMsg.callId,
        seqMsg.content,
        seqMsg.createdAt
      );
    });
  }
};
