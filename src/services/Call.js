const { sequelize } = require("../database/models/index");
const CallModel = sequelize.models.Call;
const ClientModel = sequelize.models.Client;

module.exports = class Call {
  async create(name, cpf, description, status) {
    const client = await ClientModel.findOne({
      where: {
        cpf,
      },
    });

    if (client) {
      return await CallModel.create({
        name,
        client_id: client.id,
        description,
        status,
      })
        .then(result => result.dataValues)
        .catch(error => {
          throw new Error(error);
        });
    } else {
      let error = new Error("Nenhum cliente cadastrado com esse CPF.");
      error.code = 400;
      throw error;
    }
  }

  async delete(id) {
    const result = await CallModel.findOne({
      where: {
        id,
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
    else throw new Error(10);
  }

  async getById(id) {
    return await CallModel.findOne({
      where: {
        id,
      },
    })
      .then(result => {
        if (result) return result.dataValues;
        else {
          let error = new Error("Chamado não encontrado");
          error.code = 404;

          throw error;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  async index() {
    return await CallModel.findAll().catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }

  async update(callId, new_call) {
    const [result] = await CallModel.findAll({
      where: {
        id: callId,
      },
    });

    if (result) {
      return await result
        .update(new_call)
        .then(result => result.dataValues)
        .catch(error => {
          throw new Error(error);
        });
    } else {
      let error = new Error("Chamado não encontrado");
      error.code = 400;

      throw error;
    }
  }
};
