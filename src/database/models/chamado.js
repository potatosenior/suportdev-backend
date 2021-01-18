"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Chamado = sequelize.define("Chamado", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  Chamado.associate = models => {
    Chamado.hasMany(models.Mensagem, {
      foreignKey: "chamadoId",
      as: "mensagem",
      onDelete: "CASCADE",
    });
  };

  return Chamado;
};
