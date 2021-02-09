"use strict";

module.exports = class {
  constructor({
    id = null,
    password,
    name,
    cpf,
    email,
    birthday,
    phone,
    address,
  }) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.birthday = birthday;
    this.phone = phone;
    this.address = address;
  }
};
