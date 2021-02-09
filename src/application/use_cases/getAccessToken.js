"use strict";

module.exports = async (
  email,
  password,
  { clientRepository, accessTokenManager, hashManager }
) => {
  const client = await clientRepository.getByEmail(email);

  if (!client || !hashManager.compare(password, client.password)) {
    const error = new Error("Email e/ou senha incorreto(s)!");
    error.code = 400;

    throw error;
  }

  return accessTokenManager.generate({ uid: client.id });
};
