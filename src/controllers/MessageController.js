const MessageService = require("../services/Message");
const Message = new MessageService();

module.exports = class MessageController {
  createMessage = async (req, res) => {
    const { content, callId } = req.body;

    try {
      if (content && callId) {
        return await Message.create(content, callId)
          .then(result => {
            return res.status(201).send({
              error: false,
              message: "Mensagem criada com sucesso!",
              data: result,
            });
          })
          .catch(error => {
            throw error;
          });
      }
      return res.status(400).send({
        error: true,
        message: "Dados incompletos!",
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .send({ error: true, messsage: error.message });
    }
  };

  deleteMessage = async (req, res) => {
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
        await Message.index(callId)
          .then(result => {
            return res.status(200).send(result);
          })
          .catch(error => {
            throw new Error(error);
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: true,
        message: "Erro interno!",
      });
    }
  };
};
