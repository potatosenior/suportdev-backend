"use strict";

const VerifyAccessToken = require("../../application/use_cases/verifyAccessToken");
const serviceLocator = require("../../infrastructure/config/service-locator");

module.exports = {
  authenticateJWT(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    try {
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        const error = new Error("Cabeçalho de autorização inválido!");
        error.code = 400;
        throw error;
      }

      const accessToken = authorizationHeader
        .replace(/Bearer/gi, "")
        .replace(/ /g, "");

      const { uid } = VerifyAccessToken(accessToken, serviceLocator);

      req.session.uid = uid;

      next();
    } catch (error) {
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
        path: error.path || null,
      });
    }
  },
};
