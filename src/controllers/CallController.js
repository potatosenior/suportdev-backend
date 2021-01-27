const { sequelize } = require("../database/models/index");
const Call = sequelize.models.Call;

module.exports = class CallsController {
  createCall = async (req, res) => {
    const { name, client, description, status } = req.body;

    try {
      if (client && name && description) {
        const new_call = await Call.build({
          name,
          client,
          description,
          status,
        });

        await new_call.save();

        return res.status(201).send({
          error: false,
          message: "Call criado com sucesso!",
          data: new_call,
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

  deletarCall = async (req, res) => {
    const { callId } = req.query;

    try {
      if (callId) {
        const [result] = await Call.findAll({
          where: {
            id: callId,
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
      }
      return res.status(400).send();
    } catch (error) {
      return res.status(500).send();
    }
  };

  indexCalls = async (req, res) => {
    try {
      const result = await Call.findAll();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500);
    }
  };

  updateCall = async (req, res) => {
    const { name, client, status, description, callId } = req.body;

    try {
      if (name && client && status && description) {
        const [result] = await Call.findAll({
          where: {
            id: callId,
          },
        });

        if (result) {
          result.update({
            name,
            client,
            description,
            status,
          });

          return res.status(200).send({
            error: false,
            message: "Sucesso ao editar!",
            data: result,
          });
        }
      }

      return res.status(400);
    } catch (error) {
      return res.status(500);
    }
  };
};
