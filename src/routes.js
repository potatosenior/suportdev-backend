const Router = require("express").Router;
const CallController = require("./controllers/CallController.js");
const MessageController = require("./controllers/MessageController.js");

const Calls = new CallController();
const Messages = new MessageController();

const routes = Router();

routes.get("/", (req, res) => {
  return res.send("hello world!");
});

routes.post("/calls/create", Calls.createCall);
routes.delete("/calls/deletar", Calls.deletarCall);
routes.get("/calls/index", Calls.indexCalls);
routes.patch("/calls/atualizar", Calls.atualizarCall);

routes.post("/calls/messages/create", Messages.createMessage);
routes.delete("/calls/messages/deletar", Messages.deletarMessage);
routes.get("/calls/messages/index", Messages.indexMessages);

module.exports = routes;
