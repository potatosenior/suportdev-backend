const { Router } = require("express");
const controller = require("../controllers/AuthController");

const routes = Router();

routes.post("/oauth/token", controller.getAccessToken);

module.exports = routes;
