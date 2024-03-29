module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'HistoricoDeTransacoesDeAtivos',
      [
        {
          usuarioId: 1,
          ativoId: 1,
          quantidade: 100,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 21,
        },
        {
          usuarioId: 1,
          ativoId: 2,
          quantidade: 20,
          data: new Date(2022, 5, 11),
          tipoDeTransacao: 'Compra',
          precoUnitario: 29,
        },
        {
          usuarioId: 1,
          ativoId: 2,
          quantidade: 10,
          data: new Date(2022, 5, 12),
          tipoDeTransacao: 'Venda',
          precoUnitario: 29.95,
        },
        {
          usuarioId: 1,
          ativoId: 3,
          quantidade: 20,
          data: new Date(2022, 5, 13),
          tipoDeTransacao: 'Compra',
          precoUnitario: 30,
        },
        {
          usuarioId: 2,
          ativoId: 1,
          quantidade: 100,
          data: new Date(2022, 5, 20),
          tipoDeTransacao: 'Compra',
          precoUnitario: 20,
        },
        {
          usuarioId: 2,
          ativoId: 4,
          quantidade: 50,
          data: new Date(2022, 5, 25),
          tipoDeTransacao: 'Compra',
          precoUnitario: 20,
        },
        {
          usuarioId: 2,
          ativoId: 4,
          quantidade: 50,
          data: new Date(2022, 5, 29),
          tipoDeTransacao: 'Compra',
          precoUnitario: 24,
        },
        {
          usuarioId: 2,
          ativoId: 5,
          quantidade: 50,
          data: new Date(2022, 5, 30),
          tipoDeTransacao: 'Compra',
          precoUnitario: 17,
        },
        {
          usuarioId: 3,
          ativoId: 6,
          quantidade: 50,
          data: new Date(2022, 5, 30),
          tipoDeTransacao: 'Compra',
          precoUnitario: 10,
        },
        {
          usuarioId: 3,
          ativoId: 7,
          quantidade: 5,
          data: new Date(2022, 6, 1),
          tipoDeTransacao: 'Compra',
          precoUnitario: 10,
        },
        {
          usuarioId: 3,
          ativoId: 8,
          quantidade: 100,
          data: new Date(2022, 6, 2),
          tipoDeTransacao: 'Compra',
          precoUnitario: 8.5,
        },
        {
          usuarioId: 4,
          ativoId: 9,
          quantidade: 100,
          data: new Date(2022, 6, 3),
          tipoDeTransacao: 'Compra',
          precoUnitario: 9,
        },
        {
          usuarioId: 4,
          ativoId: 9,
          quantidade: 100,
          data: new Date(2022, 6, 3),
          tipoDeTransacao: 'Venda',
          precoUnitario: 9,
        },
        {
          usuarioId: 4,
          ativoId: 10,
          quantidade: 100,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 6,
        },
        {
          usuarioId: 4,
          ativoId: 1,
          quantidade: 400,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 17.5,
        },
        {
          usuarioId: 4,
          ativoId: 2,
          quantidade: 10,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 30,
        },
        {
          usuarioId: 4,
          ativoId: 3,
          quantidade: 5,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 32,
        },
        {
          usuarioId: 4,
          ativoId: 4,
          quantidade: 20,
          data: new Date(2022, 5, 10),
          tipoDeTransacao: 'Compra',
          precoUnitario: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('HistoricoDeTransacoesDeAtivos', null, {});
  },
};
