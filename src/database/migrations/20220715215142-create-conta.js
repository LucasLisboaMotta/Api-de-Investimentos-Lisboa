'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContasDosUsuarios', {
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
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContasDosUsuarios');
  }
};