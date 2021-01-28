const Router = require("express").Router;
const MessageController = require("../controllers/MessageController.js");

const controller = new MessageController();

const routes = Router();

routes.post("/create", controller.createMessage);
routes.delete("/delete", controller.deleteMessage);
routes.get("/index", controller.indexMessages);

module.exports = routes;
