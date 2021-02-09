"use strict";

const GetAccessToken = require("../../application/use_cases/getAccessToken");
const serviceLocator = require("../../infrastructure/config/service-locator");

module.exports = {
  async getAccessToken(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
      const accessToken = await GetAccessToken(
        email,
        password,
        serviceLocator
      ).catch(error => {
        throw error;
      });

      return res.status(200).send(accessToken);
    } catch (error) {
      console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
        path: error.path || null,
      });
    }
  },
};
