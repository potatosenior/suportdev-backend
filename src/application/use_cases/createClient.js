"use strict";

const Client = require("../../domain/Client");
const clientValidator = require("../../utils/validators/client");

module.exports = async (
  name,
  cpf,
  email,
  birthday,
  phone,
  address,
  { clientRepository }
) => {
  const error = new Error("");
  if (await clientRepository.getByCpf(cpf)) {
    error.code = 400;
    error.path = "cpf";
    error.message = "Cpf já cadastrado!";
    throw error;
  }
  if (await clientRepository.getByEmail(email)) {
    error.code = 400;
    error.path = "email";
    error.message = "Email já cadastrado!";
    throw error;
  }
  if (
    !clientValidator.isValidSync({
      name,
      cpf,
      email,
      birthday,
      phone,
      address,
    })
  ) {
    error.code = 400;
    error.message = "Dados inválidos!";
    throw error;
  }

  const user = new Client(null, name, cpf, email, birthday, phone, address);

  return clientRepository.persist(user);
};
