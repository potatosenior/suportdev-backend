const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/database/models/index");
const Chamado = sequelize.models.Chamado;

var chamadoId = null;

test("Deve criar um chamado", async () => {
  const response = await request(app)
    .post("/chamados/criar")
    .send({
      nome: "Test",
      cliente: "Test Cliente",
      descricao: "Lorem ipsum",
      status: "aberto",
    })
    .expect(201);

  chamadoId = response.body.data.id;

  const chamado = await Chamado.findAll({
    where: { id: chamadoId },
  });
  expect(chamado).not.toBeNull();
});

test("Deve atualizar um chamado", async () => {
  await request(app)
    .patch("/chamados/atualizar")
    .send({
      nome: "Test Atualizado",
      cliente: "Test Cliente Atualizado",
      descricao: "Lorem ipsum dolor",
      status: "fechado",
      chamadoId,
    })
    .expect(200);
});

test("Deve criar uma mensagem", async () => {
  const response = await request(app)
    .post("/chamados/mensagens/criar")
    .send({
      conteudo: "Lorem ipsum dolor",
      chamadoId,
    })
    .expect(201);

  expect(response.body.data).not.toBeNull();
});

test("Deve listar mensagens", async () => {
  const response = await request(app)
    .get("/chamados/mensagens/listar?chamadoId=" + chamadoId)
    .send({
      chamadoId,
    })
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Deve listar os chamado", async () => {
  const response = await request(app)
    .get("/chamados/listar")
    .send()
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Deve deletar o chamado", async () => {
  await request(app)
    .delete("/chamados/deletar?chamadoId=" + chamadoId)
    .send({})
    .expect(200);
});
