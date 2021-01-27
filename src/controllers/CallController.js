const CallService = require("../services/Call");
const Call = new CallService();
module.exports = class CallsController {
  createCall = async (req, res) => {
    const { name, client, description, status } = req.body;

    try {
      if (
        client &&
        name &&
        description &&
        (status === "open" || status === "closed")
      ) {
        await Call.create(name, client, description, status)
          .then(result => {
            return res.status(201).send({
              error: false,
              message: "Chamado criado com sucesso!",
              data: result,
            });
          })
          .catch(error => {
            throw new Error(error);
          });
      } else {
        return res.status(400).send({
          error: true,
          message: "Dados incompletos!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  deleteCall = async (req, res) => {
    const { callId } = req.query;

    try {
      if (callId) {
        await Call.delete(callId)
          .then(result => {
            return res.status(200).send({
              error: false,
              message: "Sucesso ao deletar!",
              data: result,
            });
          })
          .catch(error => {
            if (error.message == 10)
              return res
                .status(400)
                .send({ error: true, message: "Chamado não encontrado!" });

            throw new Error(error);
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  indexCalls = async (req, res) => {
    try {
      const result = await Call.index();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  updateCall = async (req, res) => {
    const { name, client, status, description, callId } = req.body;

    try {
      if (
        client &&
        name &&
        description &&
        (status === "open" || status === "closed")
      ) {
        await Call.update(callId, {
          name: name.trim(),
          client: client.trim(),
          description: description.trim(),
          status,
        })
          .then(result => {
            console.log("result:", result);
            return res.status(200).send({
              error: false,
              message: "Sucesso ao editar!",
              data: result,
            });
          })
          .catch(error => {
            if (error.message == 10)
              return res
                .status(400)
                .send({ error: true, message: "Chamado não encontrado!" });
            throw new Error(error);
          });
      } else
        return res
          .status(400)
          .send({ error: true, message: "Dados inválidos!" });
    } catch (error) {
      return res.status(500).send({ error: true, message: "Erro interno!" });
    }
  };
};
