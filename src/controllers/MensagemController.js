const { sequelize } = require("../database/models/index");
const Mensagem = sequelize.models.Mensagem;

module.exports = class MensagemController {
  criarMensagem = async (req, res) => {
    const { conteudo, chamadoId } = req.body;

    try {
      if (conteudo && chamadoId) {
        const nova_msg = await Mensagem.build({
          conteudo,
          chamadoId,
        });

        await nova_msg.save();

        return res.status(201).send({
          error: false,
          message: "Mensagem criada com sucesso!",
          data: nova_msg,
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

  deletarMensagem = async (req, res) => {
    const { id } = req.body;

    try {
      const [result] = await Mensagem.findAll({
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

  listarMensagens = async (req, res) => {
    const { chamadoId } = req.query;

    try {
      if (chamadoId) {
        const result = await Mensagem.findAll({
          where: {
            chamadoId,
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
