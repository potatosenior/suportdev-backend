const { Router } = require("express");
const controller = require("../controllers/MessageController.js");

const routes = Router();

routes.post("/create", controller.create);
routes.delete("/delete", controller.delete);
routes.get("/index/:callId", controller.indexByCallId);

module.exports = routes;
