'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AtivosDosUsuarios', {
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
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
      quantidade: {
        type: Sequelize.INTEGER
      },
      precoDeCompra: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AtivosDosUsuarios');
  }
};