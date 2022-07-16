'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'AtivosDosUsuarios',
      [
        {
          usuarioId: 1,
          ativoId: 1,
          quantidade: 100,
          precoDeCompra: 2100
        },
        {
          usuarioId: 1,
          ativoId: 2,
          quantidade: 10,
          precoDeCompra: 280.5
        },
        {
          usuarioId: 1,
          ativoId: 3,
          quantidade: 20,
          precoDeCompra: 600
        },
        {
          usuarioId: 2,
          ativoId: 1,
          quantidade: 100,
          precoDeCompra: 2000
        },
        {
          usuarioId: 2,
          ativoId: 4,
          quantidade: 100,
          precoDeCompra: 2200
        },
        {
          usuarioId: 2,
          ativoId: 5,
          quantidade: 50,
          precoDeCompra: 850
        },
        {
          usuarioId: 3,
          ativoId: 6,
          quantidade: 50,
          precoDeCompra: 500
        },
        {
          usuarioId: 3,
          ativoId: 7,
          quantidade: 5,
          precoDeCompra: 500
        },
        {
          usuarioId: 3,
          ativoId: 8,
          quantidade: 100,
          precoDeCompra: 850
        },
        {
          usuarioId: 4,
          ativoId: 9,
          quantidade: 10,
          precoDeCompra: 90
        },
        {
          usuarioId: 4,
          ativoId: 10,
          quantidade: 100,
          precoDeCompra: 600
        },
        {
          usuarioId: 4,
          ativoId: 1,
          quantidade: 400,
          precoDeCompra: 7000
        },
        {
          usuarioId: 4,
          ativoId: 2,
          quantidade: 10,
          precoDeCompra: 300
        },
        {
          usuarioId: 4,
          ativoId: 3,
          quantidade: 5,
          precoDeCompra: 160
        },
        {
          usuarioId: 4,
          ativoId: 4,
          quantidade: 20,
          precoDeCompra: 40
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AtivosDosUsuarios', null, {});
  }
};
