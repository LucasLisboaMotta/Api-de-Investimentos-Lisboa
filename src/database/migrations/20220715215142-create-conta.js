module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContasDosUsuarios', {
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL(20,2),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ContasDosUsuarios');
  },
};
