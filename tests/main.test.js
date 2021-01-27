const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/database/models/index");
const Call = sequelize.models.Call;

var callId = null;

test("Deve criar um chamado", async () => {
  const response = await request(app)
    .post("/calls/create")
    .send({
      name: "Test",
      client: "Test Client",
      description: "Lorem ipsum",
      status: "open",
    })
    .expect(201);

  callId = response.body.data.id;

  const call = await Call.findAll({
    where: { id: callId },
  });
  expect(call).not.toBeNull();
});

test("Não deve criar um chamado", async () => {
  const testsCase = [
    {
      name: "",
      client: "Test Client",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      client: "",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      client: "Test Client",
      description: "",
      status: "open",
    },
  ];

  testsCase.forEach(async test => {
    const response = await request(app)
      .post("/calls/create")
      .send(test)
      .expect(400);

    expect(response.body.data).toBeUndefined();
  });
});

test("Deve atualizar um chamado", async () => {
  await request(app)
    .patch("/calls/update")
    .send({
      name: "Test Atualizado",
      client: "Test Client Atualizado",
      description: "Lorem ipsum dolor",
      status: "closed",
      callId,
    })
    .expect(200);
});

test("Nao deve atualizar um chamado", async () => {
  const testsCase = [
    {
      name: "",
      client: "Test Client",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      client: "",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      client: "Test Client",
      description: "",
      status: "open",
    },
  ];

  testsCase.forEach(async test => {
    await request(app).patch("/calls/update").send(test).expect(400);
  });
});

test("Deve listar os chamados", async () => {
  const response = await request(app).get("/calls/index").send().expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Deve criar uma mensagem", async () => {
  const response = await request(app)
    .post("/calls/messages/create")
    .send({
      content: "Lorem ipsum dolor",
      callId,
    })
    .expect(201);

  expect(response.body.data).not.toBeNull();
});

test("Não deve criar uma mensagem", async () => {
  const response = await request(app)
    .post("/calls/messages/create")
    .send({
      content: "Lorem ipsum dolor!",
      callId: 999,
    })
    .expect(400);

  expect(response.body.data).toBe(undefined);
});

test("Deve listar mensagens", async () => {
  const response = await request(app)
    .get("/calls/messages/index?callId=" + callId)
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Não deve listar mensagens", async () => {
  const response = await request(app)
    .get("/calls/messages/index?callId=" + 9999)
    .expect(200);

  expect(response.body.data).toBe(undefined);
});

test("Não deve deletar o chamado", async () => {
  await request(app)
    .delete("/calls/deletar?callId=" + 999)
    .expect(400);
});

test("Deve deletar o chamado", async () => {
  return await request(app)
    .delete("/calls/deletar?callId=" + callId)
    .send()
    .expect(200);
});
