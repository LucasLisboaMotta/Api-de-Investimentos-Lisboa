module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoricoDeTransacoesDeAtivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      },
      quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      precoUnitario: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      tipoDeTransacao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('HistoricoDeTransacoesDeAtivos');
  },
};
