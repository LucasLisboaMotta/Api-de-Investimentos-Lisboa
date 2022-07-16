'use strict';

// usuarioId!: number;
// saldo!: number;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ContasDosUsuarios',
      [
        {
          usuarioId: 1,
          saldo: 300.50,
        },
        {
          usuarioId: 2,
          saldo: 2000.10,
        },
        {
          usuarioId: 3,
          saldo: 400.50,
        },
        {
          usuarioId: 4,
          saldo: 5000,
        },
        {
          usuarioId: 5,
          saldo: 10.07,
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ContasDosUsuarios', null, {});
  }
};
