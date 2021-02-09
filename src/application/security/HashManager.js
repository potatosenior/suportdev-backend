module.exports = class {
  hash() {
    console.log("test");
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  compare() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
