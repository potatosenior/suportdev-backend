"use strict";

const { sequelize } = require("../orm/sequelize/sequelize");
const Client = require("../../domain/Client");
const ClientRepository = require("../../domain/ClientRepository");

module.exports = class extends ClientRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model("Client");
  }

  async persist(clientEntity) {
    const { firstName, lastName, email, password } = clientEntity;
    const seqClient = await this.model.create({
      firstName,
      lastName,
      email,
      password,
    });
    await seqClient.save();

    return new Client(
      seqClient.id,
      seqClient.firstName,
      seqClient.lastName,
      seqClient.email,
      seqClient.password
    );
  }

  async merge(clientEntity) {
    const seqClient = await this.model.findByPk(clientEntity.id);

    if (!seqClient) return false;

    const { firstName, lastName, email, password } = clientEntity;
    await seqClient.update({ firstName, lastName, email, password });

    return new Client(
      seqClient.id,
      seqClient.firstName,
      seqClient.lastName,
      seqClient.email,
      seqClient.password
    );
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
    return new Client(
      seqClient.id,
      seqClient.firstName,
      seqClient.lastName,
      seqClient.email,
      seqClient.password
    );
  }

  async getByEmail(clientEmail) {
    const seqClient = await this.model.findOne({
      where: { email: clientEmail },
    });
    return new Client(
      seqClient.id,
      seqClient.firstName,
      seqClient.lastName,
      seqClient.email,
      seqClient.password
    );
  }

  async find() {
    const seqClients = await this.model.findAll();
    return seqClients.map(seqClient => {
      return new Client(
        seqClient.id,
        seqClient.firstName,
        seqClient.lastName,
        seqClient.email,
        seqClient.password
      );
    });
  }
};
