"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const environment = require("../../config/environment");
const db = {};
let sequelize;

if (environment.database.url) {
  console.log(environment.database);
  sequelize = new Sequelize(environment.database.url, environment.database);
} else {
  sequelize = new Sequelize(
    environment.database.database,
    environment.database.username,
    environment.database.password,
    environment.database
  );
}

fs.readdirSync(path.join(__dirname, ".", "models"))
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, ".", "models", file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
