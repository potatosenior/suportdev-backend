const { Router } = require("express");
const controller = require("../controllers/ClientController");

const routes = Router();

routes.post("/create", controller.createClient);
// routes.delete("/delete", controller.deleteClient);
// routes.get("/index", controller.indexClients);
// routes.get("/index/:id", controller.indexById);
// routes.patch("/update", controller.updateClient);

module.exports = routes;
