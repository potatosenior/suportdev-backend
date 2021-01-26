const { sequelize } = require("../database/models/index");
const Message = sequelize.models.Message;

module.exports = class MessageController {
  createMessage = async (req, res) => {
    const { content, callId } = req.body;

    try {
      if (content && callId) {
        const new_msg = await Message.build({
          content,
          callId,
        });

        await new_msg.save();

        return res.status(201).send({
          error: false,
          message: "Message criada com sucesso!",
          data: new_msg,
        });
      } else {
        return res.status(400).send({
          error: true,
          message: "Dados incompletos!",
        });
      }
    } catch (error) {
      return res.status(500);
    }
  };

  deletarMessage = async (req, res) => {
    const { id } = req.body;

    try {
      const [result] = await Message.findAll({
        where: {
          id: id,
        },
      });

      if (result) {
        await result.destroy();
        return res.status(200).send("Deletado com sucesso!");
      }

      return res.status(400);
    } catch (error) {
      return res.status(500);
    }
  };

  indexMessages = async (req, res) => {
    const { callId } = req.query;

    try {
      if (callId) {
        const result = await Message.findAll({
          where: {
            callId,
          },
        });

        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          error: true,
          message: "Dados incompletos!",
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: "Erro interno!",
      });
    }
  };
};
