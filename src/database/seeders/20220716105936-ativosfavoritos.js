module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'AtivosFavoritos',
      [
        {
          usuarioId: 1,
          ativoId: 1,
        },
        {
          usuarioId: 1,
          ativoId: 2,
        },
        {
          usuarioId: 1,
          ativoId: 3,
        },
        {
          usuarioId: 1,
          ativoId: 4,
        },
        {
          usuarioId: 2,
          ativoId: 1,
        },
        {
          usuarioId: 2,
          ativoId: 4,
        },
        {
          usuarioId: 2,
          ativoId: 5,
        },
        {
          usuarioId: 2,
          ativoId: 6,
        },
        {
          usuarioId: 3,
          ativoId: 6,
        },
        {
          usuarioId: 3,
          ativoId: 7,
        },
        {
          usuarioId: 3,
          ativoId: 8,
        },
        {
          usuarioId: 4,
          ativoId: 9,
        },
        {
          usuarioId: 4,
          ativoId: 10,
        },
        {
          usuarioId: 4,
          ativoId: 7,
        },
        {
          usuarioId: 4,
          ativoId: 1,
        },
        {
          usuarioId: 4,
          ativoId: 2,
        },
        {
          usuarioId: 4,
          ativoId: 3,
        },
        {
          usuarioId: 5,
          ativoId: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('AtivosFavoritos', null, {});
  },
};
