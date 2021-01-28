const ClientService = require("../services/Client");
const Client = new ClientService();

module.exports = class ClientsController {
  createClient = async (req, res) => {
    const { name, cpf, date_of_birth } = req.body;

    try {
      if (name && cpf && date_of_birth) {
        await Client.create(name, cpf, date_of_birth)
          .then(result => {
            return res.status(201).send({
              error: false,
              message: "Cliente criado com sucesso!",
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

  deleteClient = async (req, res) => {
    const { client_id } = req.query;

    try {
      if (client_id) {
        await Client.delete(client_id)
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
                .send({ error: true, message: "Cliente não encontrado!" });

            throw new Error(error);
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  indexClients = async (req, res) => {
    try {
      const result = await Client.index().catch(error => {
        throw error;
      });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  indexById = async (req, res) => {
    try {
      const id = req.params.id;

      return await Client.getById(id)
        .then(result => res.status(200).send(result))
        .catch(error => {
          throw error;
        });
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
    }
  };

  updateClient = async (req, res) => {
    const { name, cpf, date_of_birth, client_id } = req.body;

    try {
      if (name && cpf && date_of_birth) {
        await Client.update(client_id, {
          name: name.trim(),
          cpf: cpf.trim(),
          date_of_birth: date_of_birth,
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
                .send({ error: true, message: "Cliente não encontrado!" });
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
