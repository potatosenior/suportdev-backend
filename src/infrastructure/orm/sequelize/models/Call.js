"use strict";

module.exports = (sequelize, DataTypes) => {
  const Call = sequelize.define("Call", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
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
    Call.belongsTo(models.Client, {
      foreignKey: "clientId",
      onDelete: "CASCADE",
    });
    Call.hasMany(models.Message, {
      foreignKey: "callId",
      as: "message",
      onDelete: "CASCADE",
    });
  };

  return Call;
};
