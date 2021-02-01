const clientValidator = require("../src/utils/validators/client.js");

test("Validar o cliente", async () => {
  const result = clientValidator.isValidSync({
    name: "algum nome",
    cpf: "78762428128",
    email: "email@test.com",
    phone_number: "1111111111",
    adress: "endereço",
    date_of_birth: "2000-01-01",
  });

  expect(result).toBe(true);
});
