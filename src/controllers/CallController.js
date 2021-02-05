const CallService = require("../services/Call");
const Call = new CallService();
module.exports = class CallsController {
  createCall = async (req, res) => {
    const { name, cpf, description, status } = req.body;

    try {
      if (
        name &&
        cpf &&
        description &&
        (status === "open" || status === "closed")
      ) {
        await Call.create(name, cpf, description, status)
          .then(result => {
            return res.status(201).send({
              error: false,
              message: "Chamado criado com sucesso!",
              data: result,
            });
          })
          .catch(error => {
            throw error;
          });
      } else {
        return res.status(400).send({
          error: true,
          message: "Dados incompletos!",
        });
      }
    } catch (error) {
      // console.error(error);
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
    }
  };

  deleteCall = async (req, res) => {
    const { id } = req.query;

    try {
      if (id) {
        await Call.delete(id)
          .then(result => {
            return res.status(200).send({
              error: false,
              message: "Sucesso ao deletar!",
              data: result,
            });
          })
          .catch(error => {
            throw error;
          });
      }
    } catch (error) {
      // console.error(error);
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

  indexById = async (req, res) => {
    try {
      const id = req.params.id;

      if (id)
        return await Call.getById(id)
          .then(result => res.status(200).send(result))
          .catch(error => {
            throw error;
          });
      else
        return res.status(400).send({ error: true, message: "Id inválido." });
    } catch (error) {
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
    }
  };

  updateCall = async (req, res) => {
    const { name, cpf, status, description, id } = req.body;

    try {
      if (
        cpf &&
        name &&
        description &&
        (status === "open" || status === "closed")
      ) {
        await Call.update(id, {
          name: name.trim(),
          cpf: cpf.trim(),
          description: description.trim(),
          status,
        })
          .then(result => {
            return res.status(200).send({
              error: false,
              message: "Sucesso ao editar!",
              data: result,
            });
          })
          .catch(error => {
            throw error;
          });
      } else
        return res
          .status(400)
          .send({ error: true, message: "Dados inválidos!" });
    } catch (error) {
      return res
        .status(error.status || 500)
        .send({ error: true, message: error.message });
    }
  };
};
