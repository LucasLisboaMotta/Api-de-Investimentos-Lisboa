'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecomendacoesDeAtivos', {
      gerenteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Gerentes',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      ativoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      nota: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecomendacoesDeAtivos');
  }
};