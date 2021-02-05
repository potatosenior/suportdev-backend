/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/infrastructure/webserver/server");
const { sequelize } = require("../src/infrastructure/orm/sequelize/sequelize");
const { Call, Client } = sequelize.models;
/* const Call = sequelize.models.Call;
const Client = sequelize.models.Client; */

let callId = null;
let clientId = null;
const clientCpf = "78762428128";

test("Deve criar um cliente", async () => {
  const response = await request(app)
    .post("/clients/create")
    .send({
      name: "Test client",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    })
    .expect(201);

  clientId = response.body.data.id;

  const client = await Client.findOne({
    where: { id: clientId },
  });

  expect(client).not.toBeNull();
});

test("Não deve criar um cliente", async () => {
  const testsCase = [
    {
      name: "",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: "11111111111",
      email: "email@",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: clientCpf,
      email: "email",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "",
      phone: "1122223333",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "112223",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "",
    },
    {
      name: "Test",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    },
    {
      name: "Test",
      cpf: "42343727813",
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
    },
  ];

  testsCase.forEach(async test => {
    const response = await request(app)
      .post("/clients/create")
      .send(test)
      .expect(400);

    expect(response.body.data).toBeUndefined();
  });
});

test("Deve atualizar um cliente", async () => {
  await request(app)
    .patch("/clients/update")
    .send({
      name: "Test client atualizado",
      cpf: clientCpf,
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
      client_id: clientId,
    })
    .expect(200);
});

test("Não deve atualizar um cliente", async () => {
  await request(app)
    .patch("/clients/update")
    .send({
      name: "Test client atualizado",
      cpf: "1111111111",
      email: "email@test.com",
      birthday: "2020-01-01",
      phone: "1122223333",
      address: "endereço cliente",
      client_id: clientId,
    })
    .expect(400);
});

test("Deve criar um chamado", async () => {
  const response = await request(app)
    .post("/calls/create")
    .send({
      name: "Chamado Test",
      cpf: clientCpf,
      description: "Lorem ipsum",
      status: "open",
    })
    .expect(201);

  callId = response.body.data.id;

  const call = await Call.findOne({
    where: { id: callId },
  });
  expect(call).not.toBeNull();
});

test("Não deve criar um chamado", async () => {
  const testsCase = [
    {
      name: "",
      cpf: clientCpf,
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: "113123111",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: clientCpf,
      description: "",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: clientCpf,
      description: "",
      status: "",
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
      cpf: clientCpf,
      description: "Lorem ipsum dolor",
      status: "closed",
      id: callId,
    })
    .expect(200);
});

test("Nao deve atualizar um chamado", async () => {
  const testsCase = [
    {
      name: "",
      cpf: clientCpf,
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: "",
      description: "Lorem ipsum",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: clientCpf,
      description: "",
      status: "open",
    },
    {
      name: "Test Name",
      cpf: clientCpf,
      description: "",
      status: "",
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

test("Não deve delete o chamado", async () => {
  await request(app)
    .delete("/calls/delete?id=" + 999)
    .expect(400);
});

test("Deve delete o chamado", async () => {
  return await request(app)
    .delete("/calls/delete?id=" + callId)
    .send()
    .expect(200);
});
