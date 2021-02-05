"use strict";

module.exports = class {
  persist(User) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  merge(User) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  remove(userId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  get(userId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  getByEmail(email) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  find() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
