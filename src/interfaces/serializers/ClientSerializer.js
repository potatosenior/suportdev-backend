"use strict";
// sem uso no momento
const _serializeSingleUser = user => {
  return {
    id: user.id,
    name: user.firstName,
    cpf: user.lastName,
    birthday: user.lastName,
    phone: user.lastName,
    address: user.lastName,
    email: user.email,
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error("Expect data to be not undefined nor null");
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleUser);
    }
    return _serializeSingleUser(data);
  }
};
