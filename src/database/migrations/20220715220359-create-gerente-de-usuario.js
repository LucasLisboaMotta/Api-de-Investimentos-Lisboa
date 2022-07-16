'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GerenteDeUsuarios', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GerenteDeUsuarios');
  }
};