const bcrypt = require("bcrypt");
const HashManager = require("../../application/security/HashManager");
const { SALT_ROUNDS } = require("../config/environment");

module.exports = class extends HashManager {
  hash(payload) {
    return bcrypt.hashSync(payload, parseInt(SALT_ROUNDS));
  }

  compare(target, hash) {
    return bcrypt.compareSync(target, hash);
  }
};
