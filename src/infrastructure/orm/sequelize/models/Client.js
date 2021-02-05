"use strict";

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
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
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
