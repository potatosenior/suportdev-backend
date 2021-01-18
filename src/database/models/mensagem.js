"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define("Mensagem", {
    conteudo: {
      type: DataTypes.STRING,
    },
    chamadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Mensagem.associations = models => {
    Mensagem.belongsTo(models.Chamado, {
      foreignKey: "ChamadoId",
      onDelete: "CASCADE",
    });
  };
  return Mensagem;
};
