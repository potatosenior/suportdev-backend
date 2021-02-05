"use strict";

module.exports = class {
  constructor(id = null, name, cpf, email, birthday, phone, address) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.birthday = birthday;
    this.phone = phone;
    this.address = address;
  }
};
