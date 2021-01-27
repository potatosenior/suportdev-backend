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
routes.delete("/calls/delete", Calls.deleteCall);
routes.get("/calls/index", Calls.indexCalls);
routes.patch("/calls/update", Calls.updateCall);

routes.post("/calls/messages/create", Messages.createMessage);
routes.delete("/calls/messages/delete", Messages.deleteMessage);
routes.get("/calls/messages/index", Messages.indexMessages);

module.exports = routes;
