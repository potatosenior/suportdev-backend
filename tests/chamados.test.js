const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/database/models/index");
const Call = sequelize.models.Call;

var callId = null;

test("Deve create um call", async () => {
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

test("Deve atualizar um call", async () => {
  await request(app)
    .patch("/calls/atualizar")
    .send({
      name: "Test Atualizado",
      client: "Test Client Atualizado",
      description: "Lorem ipsum dolor",
      status: "closed",
      callId,
    })
    .expect(200);
});

test("Deve create uma message", async () => {
  const response = await request(app)
    .post("/calls/messages/create")
    .send({
      content: "Lorem ipsum dolor",
      callId,
    })
    .expect(201);

  expect(response.body.data).not.toBeNull();
});

test("Deve index messages", async () => {
  const response = await request(app)
    .get("/calls/messages/index?callId=" + callId)
    .send({
      callId,
    })
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Deve index os call", async () => {
  const response = await request(app).get("/calls/index").send().expect(200);

  expect(response.body.data).not.toBeNull();
});

test("Deve deletar o call", async () => {
  await request(app)
    .delete("/calls/deletar?callId=" + callId)
    .send({})
    .expect(200);
});
