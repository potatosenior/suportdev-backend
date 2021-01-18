const { DataTypes } = require("sequelize");
const DB = require("./connection");

const Chamado = DB.define("Chamado", {
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descrição: {
    type: DataTypes.STRING,
  },
  Status: {
    type: DataTypes.STRING,
  },
});

Chamado.associations = function (models) {
  Chamado.hasMany(models.Mensagem, {
    foreignKey: "ChamadoId",
    as: "mensagens",
    onDelete: "CASCADE",
  });
};

const Mensagem = DB.define("Mensagem", {
  Texto: {
    type: DataTypes.STRING,
  },
  ChamadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Mensagem.associations = function (models) {
  Mensagem.belongsTo(models.Chamado, {
    foreignKey: "ChamadoId",
    as: "chamado",
    onDelete: "CASCADE",
  });
};

module.exports = { Chamado };
