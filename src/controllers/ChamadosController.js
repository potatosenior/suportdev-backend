const { sequelize } = require("../database/models/index");
const Chamado = sequelize.models.Chamado;

module.exports = class ChamadosController {
  criarChamado = async (req, res) => {
    const { nome, cliente, descricao, status } = req.body;

    try {
      if (cliente && nome && descricao) {
        const novo_chamado = await Chamado.build({
          nome,
          cliente,
          descricao,
          status,
        });

        await novo_chamado.save();

        return res.status(201).send({
          error: false,
          message: "Chamado criado com sucesso!",
          data: novo_chamado,
        });
      } else {
        return res.status(400).send({
          error: true,
          message: "Dados incompletos!",
        });
      }
    } catch (error) {
      return res.status(500).send({ error: true, message: error });
    }
  };

  deletarChamado = async (req, res) => {
    const { chamadoId } = req.query;

    try {
      const [result] = await Chamado.findAll({
        where: {
          id: chamadoId,
        },
      });

      if (result) {
        await result.destroy();
        return res.status(200).send({
          error: false,
          message: "Sucesso ao deletar!",
          data: result,
        });
      }

      return res.status(400);
    } catch (error) {
      return res.status(500);
    }
  };

  listarChamados = async (req, res) => {
    try {
      const result = await Chamado.findAll();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500);
    }
  };

  atualizarChamado = async (req, res) => {
    const { nome, cliente, status, descricao, chamadoId } = req.body;

    try {
      const [result] = await Chamado.findAll({
        where: {
          id: chamadoId,
        },
      });
      result.update({
        nome,
        cliente,
        descricao,
        status,
      });

      if (result) {
        return res.status(200).send({
          error: false,
          message: "Sucesso ao editar!",
          data: result,
        });
      }

      return res.status(400);
    } catch (error) {
      return res.status(500);
    }
  };
};
