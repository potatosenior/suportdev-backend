"use strict";

const Client = require("../../domain/Client");
const clientValidator = require("../../utils/validators/client");

module.exports = async (
  clientId,
  name,
  cpf,
  email,
  birthday,
  phone,
  address,
  { userRepository }
) => {
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
    const error = new Error("");
    error.code = 400;
    error.message = "Dados inválidos!";

    throw error;
  }

  const user = new Client(clientId, name, cpf, email, birthday, phone, address);

  return userRepository.merge(user);
};
