"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mensagens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      conteudo: {
        type: Sequelize.STRING,
      },
      chamadoId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Chamados",
          key: "id",
          as: "chamadoId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Mensagens");
  },
};
