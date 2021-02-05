"use strict";

const CreateUser = require("../../application/use_cases/createClient");
const serviceLocator = require("../../infrastructure/config/service-locator");

module.exports = {
  async createClient(req, res) {
    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await CreateUser(
        firstName,
        lastName,
        email,
        password,
        serviceLocator
      );

      return res.send({
        error: false,
        message: "Usuário criado com sucesso!",
        data: user,
      });
    } catch (error) {
      return res.send({
        error: true,
        message: error.message,
      });
    }
  },
};
