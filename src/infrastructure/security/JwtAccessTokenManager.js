const jwt = require("jsonwebtoken");
const AccessTokenManager = require("../../application/security/AccessTokenManager");
const { JWT_SECRET } = require("../config/environment");

module.exports = class extends AccessTokenManager {
  generate(payload) {
    const token = jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: "36h" });

    return token;
  }

  decode(acessToken) {
    jwt.verify(acessToken, JWT_SECRET, function (error, decoded) {
      if (error) {
        throw error;
      }

      return decoded;
    });
  }
};
