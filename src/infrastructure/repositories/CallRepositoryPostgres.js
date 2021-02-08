"use strict";

const { sequelize } = require("../orm/sequelize/sequelize");
const Call = require("../../domain/Call");

module.exports = class {
  constructor() {
    this.db = sequelize;
    this.model = this.db.model("Call");
  }

  async persist(callEntity) {
    const { clientId, name, description, status } = callEntity;

    try {
      const seqCall = await this.model.create({
        name,
        clientId,
        description,
        status,
      });

      await seqCall.save();

      return new Call(seqCall.id, clientId, name, description, status);
    } catch (error) {
      error.code = 400;

      throw error;
    }
  }

  async merge(callEntity) {
    const seqCall = await this.model.findByPk(callEntity.id);

    if (!seqCall) return false;

    const { name, clientId, description, status } = callEntity;

    await seqCall.update({ name, clientId, description, status });

    return new Call(
      seqCall.id,
      seqCall.clientId,
      seqCall.name,
      seqCall.description,
      seqCall.status
    );
  }

  async remove(callId) {
    const seqCall = await this.model.findByPk(callId);
    if (seqCall) {
      return seqCall.destroy();
    }
    return false;
  }

  async get(callId) {
    const seqCall = await this.model.findByPk(callId);

    if (seqCall)
      return new Call(
        seqCall.id,
        seqCall.clientId,
        seqCall.name,
        seqCall.description,
        seqCall.status
      );
    else {
      const error = new Error("Chamado não encontrado!");
      error.code = 400;

      throw error;
    }
  }

  async find() {
    const seqCalls = await this.model.findAll();

    return seqCalls.map(seqCall => {
      return new Call(
        seqCall.id,
        seqCall.clientId,
        seqCall.name,
        seqCall.description,
        seqCall.status
      );
    });
  }
};
