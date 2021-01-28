"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    content: {
      type: DataTypes.STRING,
    },
    callId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Message.associations = models => {
    Message.belongsTo(models.Call, {
      foreignKey: "callId",
      onDelete: "CASCADE",
    });
  };
  return Message;
};
