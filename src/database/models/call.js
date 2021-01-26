"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Call = sequelize.define("Call", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  Call.associate = models => {
    Call.hasMany(models.Message, {
      foreignKey: "callId",
      as: "message",
      onDelete: "CASCADE",
    });
  };

  return Call;
};
