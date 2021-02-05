"use strict";

const createClient = require("../../application/use_cases/createClient");
const deleteClient = require("../../application/use_cases/deleteClient");
const indexClients = require("../../application/use_cases/indexClient");
const getClient = require("../../application/use_cases/getClient");
const updateClient = require("../../application/use_cases/updateClient");
const serviceLocator = require("../../infrastructure/config/service-locator");

module.exports = {
  async create(req, res) {
    const { name, cpf, email, phone, birthday, address } = req.body;

    try {
      const user = await createClient(
        name,
        cpf,
        email,
        birthday,
        phone,
        address,
        serviceLocator
      ).catch(error => {
        throw error;
      });

      return res.status(201).send({
        error: false,
        message: "Usuário criado com sucesso!",
        data: user,
      });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
        path: error.path || null,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const client = await deleteClient(id, serviceLocator).catch(error => {
        throw error;
      });

      if (client)
        return res.status(201).send({
          error: false,
          message: "Usuário deletado com sucesso!",
          data: client,
        });
      else
        return res.status(400).send({
          error: true,
          message: "Usuário não existe",
        });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async index(req, res) {
    try {
      const clients = await indexClients(serviceLocator).catch(error => {
        throw error;
      });

      return res.status(201).send(clients);
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const client = await getClient(id, serviceLocator).catch(error => {
        throw error;
      });

      return res.status(201).send({ error: false, data: client });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    const { id, name, cpf, email, phone, birthday, address } = req.body;

    try {
      const client = await updateClient(
        id,
        name,
        cpf,
        email,
        birthday,
        phone,
        address,
        serviceLocator
      ).catch(error => {
        throw error;
      });

      if (!client)
        return res
          .status(400)
          .send({ error: true, message: "Usuário não encontrado!" });

      return res.status(201).send({
        error: false,
        message: "Dados atualizados com sucesso!",
        data: client,
      });
    } catch (error) {
      console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },
};
