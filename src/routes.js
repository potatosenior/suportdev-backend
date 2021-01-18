const Router = require("express").Router;
const ChamadosController = require("./controllers/ChamadosController.js");
const MensagemController = require("./controllers/MensagemController.js");

const Chamados = new ChamadosController();
const Mensagens = new MensagemController();

const routes = Router();

// chamados
routes.post("/chamados/criar", Chamados.criarChamado);
routes.delete("/chamados/deletar", Chamados.deletarChamado);
routes.get("/chamados/listar", Chamados.listarChamados);
routes.patch("/chamados/atualizar", Chamados.atualizarChamado);
// mensagens
routes.post("/chamados/mensagens/criar", Mensagens.criarMensagem);
routes.delete("/chamados/mensagens/deletar", Mensagens.deletarMensagem);
routes.get("/chamados/mensagens/listar", Mensagens.listarMensagens);

module.exports = routes;
