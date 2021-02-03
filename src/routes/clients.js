const { Router } = require("express");
const ClientController = require("../controllers/ClientController.js");

const routes = Router();
const controller = new ClientController();

routes.post("/create", controller.createClient);
routes.delete("/delete", controller.deleteClient);
routes.get("/index", controller.indexClients);
routes.get("/index/:id", controller.indexById);
routes.patch("/update", controller.updateClient);

module.exports = routes;
