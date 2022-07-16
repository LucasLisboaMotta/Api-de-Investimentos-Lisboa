'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          nome: 'João',
          sobrenome: 'Silva',
          email: 'joaosilva@gmail.com',
          senha: '12345678'
        },
        {
          nome: 'Maria',
          sobrenome: 'Oliveira',
          email: 'mariaoliveira@yahoo.com.br',
          senha: '87654321'
        },
        {
          nome: 'Renato',
          sobrenome: 'Magalhães',
          email: 'renatomagalhaes@outlook.com',
          senha: '12344321'
        },
        {
          nome: 'Luisa',
          sobrenome: 'Alvez',
          email: 'luisaalvez@uol.com',
          senha: '11223344'
        },
        {
          nome: 'Joana',
          sobrenome: 'Furtado',
          email: 'joanafurtado@hotmail.com',
          senha: '88445566'
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
