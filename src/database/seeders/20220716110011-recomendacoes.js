module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'RecomendacoesDeAtivos',
      [
        {
          gerenteId: 1,
          ativoId: 4,
          nota: 10,
        },
        {
          gerenteId: 1,
          ativoId: 2,
          nota: 7.6,
        },
        {
          gerenteId: 2,
          ativoId: 1,
          nota: 8.75,
        },
        {
          gerenteId: 2,
          ativoId: 10,
          nota: 6,
        },
        {
          gerenteId: 2,
          ativoId: 6,
          nota: 9,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RecomendacoesDeAtivos', null, {});
  },
};
