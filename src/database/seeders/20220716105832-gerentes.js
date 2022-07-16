'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Gerentes',
      [
        {
          nome: 'Roberta',
          sobrenome: 'Simões',
          email: 'robertasimoes@live.com',
          senha: '10203040'
        },
        {
          nome: 'Carlos',
          sobrenome: 'Souza',
          email: 'carlossouza@ig.com',
          senha: '90908080'
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gerentes', null, {});
  }
};
