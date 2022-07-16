module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'AtivosDosUsuarios',
      [
        {
          usuarioId: 1,
          ativoId: 1,
          quantidade: 100,
          precoMedioDeCompra: 21,
        },
        {
          usuarioId: 1,
          ativoId: 2,
          quantidade: 10,
          precoMedioDeCompra: 28.05,
        },
        {
          usuarioId: 1,
          ativoId: 3,
          quantidade: 20,
          precoMedioDeCompra: 30,
        },
        {
          usuarioId: 2,
          ativoId: 1,
          quantidade: 100,
          precoMedioDeCompra: 20,
        },
        {
          usuarioId: 2,
          ativoId: 4,
          quantidade: 100,
          precoMedioDeCompra: 22,
        },
        {
          usuarioId: 2,
          ativoId: 5,
          quantidade: 50,
          precoMedioDeCompra: 17,
        },
        {
          usuarioId: 3,
          ativoId: 6,
          quantidade: 50,
          precoMedioDeCompra: 10,
        },
        {
          usuarioId: 3,
          ativoId: 7,
          quantidade: 5,
          precoMedioDeCompra: 100,
        },
        {
          usuarioId: 3,
          ativoId: 8,
          quantidade: 100,
          precoMedioDeCompra: 8.5,
        },
        {
          usuarioId: 4,
          ativoId: 9,
          quantidade: 10,
          precoMedioDeCompra: 9,
        },
        {
          usuarioId: 4,
          ativoId: 10,
          quantidade: 100,
          precoMedioDeCompra: 6,
        },
        {
          usuarioId: 4,
          ativoId: 1,
          quantidade: 400,
          precoMedioDeCompra: 17.5,
        },
        {
          usuarioId: 4,
          ativoId: 2,
          quantidade: 10,
          precoMedioDeCompra: 30,
        },
        {
          usuarioId: 4,
          ativoId: 3,
          quantidade: 5,
          precoMedioDeCompra: 32,
        },
        {
          usuarioId: 4,
          ativoId: 4,
          quantidade: 20,
          precoMedioDeCompra: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('AtivosDosUsuarios', null, {});
  },
};
