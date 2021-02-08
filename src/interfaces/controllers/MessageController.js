"use strict";

const createMessage = require("../../application/use_cases/createMessage");
const deleteMessage = require("../../application/use_cases/deleteMessage");
const indexByCall = require("../../application/use_cases/indexMessageByCall");
const serviceLocator = require("../../infrastructure/config/service-locator");

module.exports = {
  async create(req, res) {
    const { callId, content } = req.body;

    try {
      const msg = await createMessage(callId, content, serviceLocator).catch(
        error => {
          throw error;
        }
      );

      return res.status(201).send({
        error: false,
        message: "Mensagem criada com sucesso!",
        data: msg,
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
      const call = await deleteMessage(id, serviceLocator).catch(error => {
        throw error;
      });

      if (call)
        return res.status(201).send({
          error: false,
          message: "Mensagem deletada com sucesso!",
          data: call,
        });
      else
        return res.status(400).send({
          error: true,
          message: "Mensagem não existe",
        });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async indexByCallId(req, res) {
    const { callId } = req.params;

    try {
      const msgs = await indexByCall(callId, serviceLocator).catch(error => {
        throw error;
      });

      return res.status(200).send(msgs);
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },
};
