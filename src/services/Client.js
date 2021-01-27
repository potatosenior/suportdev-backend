const { sequelize } = require("../database/models/index");
const ClientModel = sequelize.models.Client;

module.exports = class Client {
  async create(name, cpf, date_of_birth) {
    return await ClientModel.create({
      name,
      cpf,
      date_of_birth,
    })
      .then(result => result.dataValues)
      .catch(error => {
        throw new Error(error);
      });
  }

  async delete(client_id) {
    const [result] = await ClientModel.findAll({
      where: {
        id: client_id,
      },
    }).catch(error => {
      throw new Error(error);
    });

    if (result)
      return await result
        .destroy()
        .then(() => result.dataValues)
        .catch(error => {
          throw new Error(error);
        });
    else throw new Error(10);
  }

  async index() {
    return await ClientModel.findAll()
      .then(result => result)
      .catch(error => {
        throw new Error(error);
      });
  }

  async update(client_id, newClient) {
    const [result] = await ClientModel.findAll({
      where: {
        id: client_id,
      },
    });

    if (result) {
      return await result
        .update(newClient)
        .then(result => result.dataValues)
        .catch(error => {
          throw new Error(error);
        });
    } else throw new Error(10);
  }
};