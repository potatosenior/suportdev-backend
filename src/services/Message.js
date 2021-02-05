const { sequelize } = require("../database/models/index");
const MessageModel = sequelize.models.Message;

module.exports = class Call {
  async create(content, callId) {
    return await MessageModel.create({
      content,
      callId,
    })
      .then(result => result.dataValues)
      .catch(error => {
        error.code = 400;
        error.message = "Chamado inválido";

        throw error;
      });
  }

  async delete(callId) {
    const [result] = await MessageModel.findAll({
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

  async index(callId) {
    return await MessageModel.findAll({
      where: {
        callId,
      },
    })
      .then(result => result)
      .catch(error => {
        throw new Error(error);
      });
  }
};
