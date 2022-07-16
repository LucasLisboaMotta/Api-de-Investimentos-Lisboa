module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoricoDeTransacoesBancarias', {
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
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('HistoricoDeTransacoesBancarias');
  },
};
