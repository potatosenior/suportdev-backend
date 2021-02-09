const { Router } = require("express");
const clientsRouter = require("./clients");
const callsRouter = require("./calls");
const messagesRouter = require("./messages");
const authRouter = require("./auth");

const routes = Router();
routes.use("/clients", clientsRouter);
routes.use("/calls", callsRouter);
routes.use("/calls/messages", messagesRouter);
routes.use(authRouter);

routes.get("/", (req, res) => res.send("hello world!"));

module.exports = routes;
