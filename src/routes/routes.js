const Router = require("express").Router;
const clientsRouter = require("./clients");
const callsRouter = require("./calls");
const messagesRouter = require("./messages");
const routes = Router();

routes.use("/clients", clientsRouter);
routes.use("/calls", callsRouter);
routes.use("/calls/messages", messagesRouter);

routes.get("/", (req, res) => {
  return res.send("hello world!");
});

module.exports = routes;
