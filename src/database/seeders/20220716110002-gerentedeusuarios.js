module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'GerenteDeUsuarios',
      [
        {
          usuarioId: 1,
          gerenteId: 1,
        },
        {
          usuarioId: 2,
          gerenteId: 2,
        },
        {
          usuarioId: 3,
          gerenteId: 2,
        },
        {
          usuarioId: 4,
          gerenteId: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('GerenteDeUsuarios', null, {});
  },
};
