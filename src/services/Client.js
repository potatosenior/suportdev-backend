const { sequelize } = require("../database/models/index");
const ClientModel = sequelize.models.Client;

module.exports = class Client {
  async create(data) {
    // verificar se ja nao existe um no banco de dados
    try {
      let cpfAlreadyExists = await ClientModel.findOne({
        where: {
          cpf: data.cpf,
        },
      });

      if (cpfAlreadyExists) {
        let error = new Error("Cpf já cadastrado!");
        error.code = 400;

        throw error;
      }

      let emailAlreadyExists = await ClientModel.findOne({
        where: {
          email: data.email,
        },
      });

      if (emailAlreadyExists) {
        let error = new Error("Email já cadastrado!");
        error.code = 400;

        throw error;
      }

      return await ClientModel.create(data)
        .then(result => result.dataValues)
        .catch(error => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async delete(client_id) {
    const result = await ClientModel.findOne({
      where: {
        id: client_id,
      },
    }).catch(error => {
      throw error;
    });

    if (result)
      return await result
        .destroy()
        .then(() => result.dataValues)
        .catch(error => {
          throw error;
        });
    else {
      return true;
    }
  }

  async getById(id) {
    const client = await ClientModel.findOne({
      where: {
        id,
      },
    });

    if (client) {
      return result.dataValues;
    } else {
      let error = new Error("Cliente não encontrado!");
      error.code = 400;

      throw error;
    }
  }

  async index() {
    return await ClientModel.findAll()
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }

  async update(client_id, newClientData) {
    const result = await ClientModel.findOne({
      where: {
        id: client_id,
      },
    });

    if (result) {
      return await result
        .update(newClientData)
        .then(result => result.dataValues)
        .catch(error => {
          throw error;
        });
    } else {
      let error = new Error("Cliente não encontrado!");
      error.code = 400;

      throw error;
    }
  }
};
