module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Gerentes',
      [
        {
          nome: 'Roberta',
          sobrenome: 'Simões',
          email: 'robertasimoes@live.com',
          senha: '10203040',
        },
        {
          nome: 'Carlos',
          sobrenome: 'Souza',
          email: 'carlossouza@ig.com',
          senha: '90908080',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Gerentes', null, {});
  },
};
