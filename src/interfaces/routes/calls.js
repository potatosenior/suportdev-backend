const { Router } = require("express");
const controller = require("../controllers/CallController.js");

const routes = Router();

routes.post("/create", controller.create);
routes.delete("/delete", controller.delete);
routes.get("/index", controller.index);
routes.get("/get/:id", controller.findById);
routes.patch("/update", controller.update);

module.exports = routes;
