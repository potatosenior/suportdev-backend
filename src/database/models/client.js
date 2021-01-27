"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Client.associate = models => {
    Client.hasMany(models.Call, {
      foreignKey: "callId",
      as: "call",
      onDelete: "CASCADE",
    });
  };

  return Client;
};
