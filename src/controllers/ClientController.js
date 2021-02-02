const ClientService = require("../services/Client");
const Client = new ClientService();
const validator = require("../utils/validators/client");

module.exports = class ClientsController {
  createClient = async (req, res) => {
    try {
      return await validator
        .validate(req.body, { abortEarly: false })
        .then(async data => {
          return await Client.create(data)
            .then(result => {
              return res.status(201).send({
                error: false,
                message: "Cliente criado com sucesso!",
                data: result,
              });
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          error.code = 400;

          if (error.errors)
            error.message = [...new Set(error.errors)].join("\n");

          throw error;
        });
    } catch (error) {
      // console.error(error);
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
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
            throw error;
          });
      }
    } catch (error) {
      // console.error(error);
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
    }
  };

  indexClients = async (req, res) => {
    try {
      const result = await Client.index().catch(error => {
        throw error;
      });

      return res.status(200).send(result);
    } catch (error) {
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
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
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
    }
  };

  updateClient = async (req, res) => {
    try {
      return await validator
        .validate(req.body, { abortEarly: false })
        .then(async data => {
          return await Client.update(req.body.client_id, data)
            .then(result =>
              res.status(200).send({
                error: false,
                message: "Sucesso ao editar!",
                data: result,
              })
            )
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          error.code = 400;
          throw error;
        });
    } catch (error) {
      // console.error(error);
      return res
        .status(error.code || 500)
        .send({ error: true, message: error.message });
    }
  };
};
