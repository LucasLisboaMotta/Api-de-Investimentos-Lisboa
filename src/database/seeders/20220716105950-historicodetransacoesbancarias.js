module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'HistoricoDeTransacoesBancarias',
      [
        {
          usuarioId: 1,
          valor: 3281,
          data: new Date(2022, 5, 10),
          tipo: 'Deposito',
        },
        {
          usuarioId: 1,
          valor: 2100,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 1,
          valor: 580,
          data: new Date(2022, 5, 11),
          tipo: 'Compra',
        },
        {
          usuarioId: 1,
          valor: 299.5,
          data: new Date(2022, 5, 12),
          tipo: 'Venda',
        },
        {
          usuarioId: 1,
          valor: 600,
          data: new Date(2022, 5, 13),
          tipo: 'Compra',
        },
        {
          usuarioId: 2,
          valor: 8550.1,
          data: new Date(2022, 5, 20),
          tipo: 'Deposito',
        },
        {
          usuarioId: 2,
          valor: 2000,
          data: new Date(2022, 5, 20),
          tipo: 'Compra',
        },
        {
          usuarioId: 2,
          valor: 1000,
          data: new Date(2022, 5, 25),
          tipo: 'Compra',
        },
        {
          usuarioId: 2,
          valor: 1200,
          data: new Date(2022, 5, 29),
          tipo: 'Compra',
        },
        {
          usuarioId: 2,
          valor: 850,
          data: new Date(2022, 5, 30),
          tipo: 'Compra',
        },
        {
          usuarioId: 2,
          valor: 1500,
          data: new Date(2022, 6, 1),
          tipo: 'Saque',
        },
        {
          usuarioId: 3,
          valor: 1800.5,
          data: new Date(2022, 5, 29),
          tipo: 'Deposito',
        },
        {
          usuarioId: 3,
          valor: 500,
          data: new Date(2022, 5, 30),
          tipo: 'Compra',
        },
        {
          usuarioId: 3,
          valor: 50,
          data: new Date(2022, 6, 1),
          tipo: 'Compra',
        },
        {
          usuarioId: 3,
          valor: 850,
          data: new Date(2022, 6, 2),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 20000,
          data: new Date(2022, 5, 10),
          tipo: 'Deposito',
        },
        {
          usuarioId: 4,
          valor: 900,
          data: new Date(2022, 6, 3),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 900,
          data: new Date(2022, 6, 3),
          tipo: 'Venda',
        },
        {
          usuarioId: 4,
          valor: 600,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 7000,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 300,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 160,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 40,
          data: new Date(2022, 5, 10),
          tipo: 'Compra',
        },
        {
          usuarioId: 4,
          valor: 6900,
          data: new Date(2022, 5, 15),
          tipo: 'Saque',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('HistoricoDeTransacoesBancarias', null, {});
  },
};
