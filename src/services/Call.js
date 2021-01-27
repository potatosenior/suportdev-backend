const { sequelize } = require("../database/models/index");
const CallModel = sequelize.models.Call;

module.exports = class Call {
  async create(name, client, description, status) {
    return await CallModel.create({
      name,
      client,
      description,
      status,
    })
      .then(result => result.dataValues)
      .catch(error => {
        throw new Error(error);
      });
  }

  async delete(callId) {
    const [result] = await CallModel.findAll({
      where: {
        id: callId,
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
    return await CallModel.findAll().catch(error => {
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
    } else throw new Error(10);
  }
};
