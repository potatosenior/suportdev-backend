"use strict";

module.exports = class {
  constructor(id = null, clientId = null, name, description, status) {
    this.id = id;
    this.clientId = clientId;
    this.name = name;
    this.description = description;
    this.status = status;
  }
};
