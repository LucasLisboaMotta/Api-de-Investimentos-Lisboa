module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecomendacoesDeAtivos', {
      gerenteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Gerentes',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      ativoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      nota: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('RecomendacoesDeAtivos');
  },
};
