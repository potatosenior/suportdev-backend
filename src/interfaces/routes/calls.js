const Router = require("express").Router;
const CallController = require("../controllers/CallController.js");

const routes = Router();
const controller = new CallController();

routes.post("/create", controller.createCall);
routes.delete("/delete", controller.deleteCall);
routes.get("/index", controller.indexCalls);
routes.get("/get/:id", controller.indexById);
routes.patch("/update", controller.updateCall);

module.exports = routes;
