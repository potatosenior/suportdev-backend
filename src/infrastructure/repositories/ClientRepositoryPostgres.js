"use strict";

const { sequelize } = require("../orm/sequelize/sequelize");
const Client = require("../../domain/Client");

module.exports = class {
  constructor() {
    this.db = sequelize;
    this.model = this.db.model("Client");
  }

  async persist(clientEntity) {
    try {
      const {
        name,
        cpf,
        email,
        birthday,
        phone,
        address,
        password,
      } = clientEntity;

      const seqClient = await this.model.create({
        name,
        cpf,
        email,
        birthday,
        phone,
        address,
        password,
      });

      await seqClient.save();

      return new Client(seqClient);
    } catch (error) {
      error.code = 400;

      throw error;
    }
  }

  async merge(clientEntity) {
    const seqClient = await this.model.findByPk(clientEntity.id);

    if (!seqClient) return false;

    const { name, cpf, email, birthday, phone, address } = clientEntity;
    await seqClient.update({ name, cpf, email, birthday, phone, address });

    return new Client(seqClient);
  }

  async remove(clientId) {
    const seqClient = await this.model.findByPk(clientId);
    if (seqClient) {
      return seqClient.destroy();
    }
    return false;
  }

  async get(clientId) {
    const seqClient = await this.model.findByPk(clientId);

    if (seqClient) return new Client(seqClient);
    else {
      const error = new Error("Usuário não encontrado!");
      error.code = 400;

      throw error;
    }
  }

  async getByEmail(clientEmail) {
    const seqClient = await this.model.findOne({
      where: { email: clientEmail },
    });

    if (!seqClient) return false;

    return new Client(seqClient);
  }

  async getByCpf(clientCpf) {
    const seqClient = await this.model.findOne({
      where: { cpf: clientCpf },
    });

    if (!seqClient) return false;

    return new Client(seqClient);
  }

  async find() {
    const seqClients = await this.model.findAll();

    return seqClients.map(seqClient => {
      return new Client(seqClient);
    });
  }
};
