const { sequelize } = require("../database/models/index");

const ClientModel = sequelize.models.Client;

module.exports = class Client {
  async create(data) {
    // verificar se ja nao existe um no banco de dados
    const cpfAlreadyExists = await ClientModel.findOne({
      where: {
        cpf: data.cpf,
      },
    });

    if (cpfAlreadyExists) {
      const error = new Error("Cpf já cadastrado!");
      error.code = 400;

      throw error;
    }

    const emailAlreadyExists = await ClientModel.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailAlreadyExists) {
      const error = new Error("Email já cadastrado!");
      error.code = 400;

      throw error;
    }

    return ClientModel.create(data)
      .then(result => result.dataValues)
      .catch(error => {
        throw error;
      });
  }

  async delete(id) {
    const result = await ClientModel.findOne({
      where: {
        id,
      },
    }).catch(error => {
      throw error;
    });

    if (result)
      return result
        .destroy()
        .then(() => result.dataValues)
        .catch(error => {
          throw error;
        });

    return true;
  }

  async getById(id) {
    const client = await ClientModel.findOne({
      where: {
        id,
      },
    });

    if (client) {
      return client.dataValues;
    }
    const error = new Error("Cliente não encontrado!");
    error.code = 400;

    throw error;
  }

  async index() {
    return ClientModel.findAll()
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }

  async update(id, newData) {
    const client = await ClientModel.findOne({
      where: {
        id,
      },
    });

    if (client) {
      return client
        .update(newData)
        .then(result => result.dataValues)
        .catch(error => {
          throw error;
        });
    }
    const error = new Error("Cliente não encontrado!");
    error.code = 400;

    throw error;
  }
};
