"use strict";

module.exports = (accessToken, { accessTokenManager }) => {
  const decoded = accessTokenManager.decode(accessToken).catch(error => {
    throw error;
  });
  if (!decoded) {
    const error = new Error("Token inválido!");
    error.code = 400;

    throw error;
  }
  return { uid: decoded.uid };
};
