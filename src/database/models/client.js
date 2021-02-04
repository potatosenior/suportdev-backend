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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Client.associate = models => {
    Client.hasMany(models.Call, {
      foreignKey: "client_id",
      as: "call",
      onDelete: "CASCADE",
    });
  };

  return Client;
};
