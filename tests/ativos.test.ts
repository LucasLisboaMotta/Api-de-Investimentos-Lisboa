const shell = require('shelljs');

import request from 'supertest';
import rotas from '../src/rotas/index';
import ativos from './auxiliares/ativos';
import ativosUsuario from './auxiliares/ativoUsuario';
import populares from './auxiliares/populares';
import recomendados from './auxiliares/recomendados';
import favoritos from './auxiliares/favoritos';
import AtivoFavorito from '../src/database/models/AtivoFavorito';
import Ativo from '../src/database/models/Ativo';

describe('Testando rotas "/ativos"', () => {
  
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando rota get "/ativos" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos').set({ Authorization: token });
    expect(status).toEqual(200);
    ativos.forEach(({ id, sigla, nome, quantidade, valor}, index) => {
      expect(body[index].id).toEqual(id);
      expect(body[index].sigla).toEqual(sigla);
      expect(body[index].nome).toEqual(nome);
      expect(body[index].quantidade).toEqual(quantidade);
      expect(body[index].valor).toEqual(valor);
    })
  });

  test('Testando rota get "/ativos" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

   test('Testando rota get "/ativos/meusativos" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos/meusativos').set({ Authorization: token });
      expect(status).toEqual(200);
      ativosUsuario.forEach(({ ativo, quantidade, precoMedioDeCompra }, index) => {
        expect(body[index].ativo).toEqual(ativo);
        expect(body[index].quantidade).toEqual(quantidade);
        expect(body[index].precoMedioDeCompra).toEqual(precoMedioDeCompra);
      });
   });

   test('Testando rota get "/ativos/meusativos" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos/meusativos').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando rota get "/ativos/:id" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos/7').set({ Authorization: token });
    expect(status).toEqual(200);
    expect(body.id).toEqual(7);
    expect(body.sigla).toEqual('VALE3');
    expect(body.nome).toEqual('VALE');
    expect(body.quantidade).toEqual(250);
    expect(body.valor).toEqual('68.37');
  });

  test('Testando rota get "/ativos/:id" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos/7').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });


  test('Testando rota get "/ativos/:id" com ativo inexistente', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const {status, body: { message }} = await request(rotas).get('/ativos/17').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Ativo não encontrado')
  });


  test('Testando rota get "/ativos/populares" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos/populares').set({ Authorization: token });
      expect(status).toEqual(200);
      populares.forEach(({ id, sigla, nome, quantidade, valor}, index) => {
        expect(body[index].id).toEqual(id);
        expect(body[index].sigla).toEqual(sigla);
        expect(body[index].nome).toEqual(nome);
        expect(body[index].quantidade).toEqual(quantidade);
        expect(body[index].valor).toEqual(valor);
      })
   });

  test('Testando rota get "/ativos/populares" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos/populares').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando rota get "/ativos/recomendados" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos/recomendados').set({ Authorization: token });
      expect(status).toEqual(200);
      recomendados.forEach(({ id, sigla, nome, quantidade, valor, nota}, index) => {
        expect(body[index].id).toEqual(id);
        expect(body[index].sigla).toEqual(sigla);
        expect(body[index].nome).toEqual(nome);
        expect(body[index].quantidade).toEqual(quantidade);
        expect(body[index].valor).toEqual(valor);
        expect(body[index].nota).toEqual(nota);
      })
   });

  test('Testando rota get "/ativos/recomendados" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos/recomendados').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });


  test('Testando rota get "/ativos/recomendados" com falha, usuario sem gerente', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joanafurtado@hotmail.com',
      senha: '88445566',
    });
    const { status, body: { message } } = await request(rotas).get('/ativos/recomendados').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Usuario não possui nenhum gerente')
  });

  test('Testando rota get "/ativos/favoritos" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body} = await request(rotas).get('/ativos/favoritos').set({ Authorization: token });
      expect(status).toEqual(200);
      favoritos.forEach(({ id, sigla, nome, quantidade, valor}, index) => {
        expect(body[index].id).toEqual(id);
        expect(body[index].sigla).toEqual(sigla);
        expect(body[index].nome).toEqual(nome);
        expect(body[index].quantidade).toEqual(quantidade);
        expect(body[index].valor).toEqual(valor);
      })
   });

  test('Testando rota get "/ativos/favoritos" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).get('/ativos/favoritos').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });


  test('Testando rota get "/ativos/favoritos/:id" com sucesso', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status } = await request(rotas).post('/ativos/favoritos/1').set({ Authorization: token });
    expect(status).toEqual(200);

    const favorito1 = await AtivoFavorito.findOne({ where: {usuarioId: 1, ativoId: 1 } });
    expect(favorito1).toEqual(null);
    
    const { status: status2 } = await request(rotas).post('/ativos/favoritos/6').set({ Authorization: token });
    expect(status2).toEqual(200);
      
    const favorito2 = await AtivoFavorito.findOne({ where: {usuarioId: 1, ativoId: 6 } });
    expect(favorito2).not.toBe(null);
  
   });

  test('Testando rota get "/ativos/favoritos/:id" com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).post('/ativos/favoritos/1').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });  

  test('Testando rota get "/ativos/favoritos/:id" com ativo inexistente', async () => {
    const { body: { token }} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).post('/ativos/favoritos/20').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Ativo não encontrado');
  });

});


describe('Testando rotas post e put "/ativos"', () => {
  
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando rota post "/ativos" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(201);
  expect(body.id).toEqual(11);
  expect(body.sigla).toEqual('SMFT3');
  expect(body.nome).toEqual('SMART FIT');
  expect(body.quantidade).toEqual(1000);
  expect(body.valor).toEqual('10.00');
  const ativoNoBanco = await Ativo.findOne({ where: { id: 11 } });
  expect(ativoNoBanco?.sigla).toEqual('SMFT3');
  expect(ativoNoBanco?.nome).toEqual('SMART FIT');
  expect(ativoNoBanco?.quantidade).toEqual(1000);
  expect(ativoNoBanco?.valor).toEqual('10.00');
  });

  test('Testando rota post "/ativos" com sigla invalida', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).post('/ativos').send({
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "sigla" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).post('/ativos').send({
    sigla: 'AB',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "sigla" deve ter de 5 a 6 caracteres');

  const { status: status3, body: { message: message3 } } = await request(rotas).post('/ativos').send({
    sigla: 'ABCDE378',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status3).toEqual(400);
  expect(message3).toEqual('O campo "sigla" deve ter de 5 a 6 caracteres');
  });

  test('Testando rota post "/ativos" com nome invalido', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "nome" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SM',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "nome" deve ter no minimo 3 caracteres');

  });

  test('Testando rota post "/ativos" com quantidade invalida', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "quantidade" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: -10,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('Quantidade de ativos invalido');

  });

  test('Testando rota post "/ativos" com valor invalido', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "valor" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).post('/ativos').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '-30.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "valor" esta invalido');

  });

  test('Testando rota post "/ativos" com sigla já existente', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).post('/ativos').send({
    sigla: 'VALE3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '30.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('Sigla já existente');

  });



  test('Testando rota put "/ativos/:id" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(200);
  expect(body.id).toEqual(1);
  expect(body.sigla).toEqual('SMFT3');
  expect(body.nome).toEqual('SMART FIT');
  expect(body.quantidade).toEqual(1000);
  expect(body.valor).toEqual('10.00');
  const ativoNoBanco = await Ativo.findOne({ where: { id: 11 } });
  expect(ativoNoBanco?.sigla).toEqual('SMFT3');
  expect(ativoNoBanco?.nome).toEqual('SMART FIT');
  expect(ativoNoBanco?.quantidade).toEqual(1000);
  expect(ativoNoBanco?.valor).toEqual('10.00');
  });

  test('Testando rota put "/ativos/:id" com sigla invalida', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).put('/ativos/1').send({
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "sigla" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).put('/ativos/1').send({
    sigla: 'AB',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "sigla" deve ter de 5 a 6 caracteres');

  const { status: status3, body: { message: message3 } } = await request(rotas).put('/ativos/1').send({
    sigla: 'ABCDE378',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status3).toEqual(400);
  expect(message3).toEqual('O campo "sigla" deve ter de 5 a 6 caracteres');
  });

  test('Testando rota put "/ativos/:id" com nome invalido', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "nome" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    nome: 'SM',
    quantidade: 1000,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "nome" deve ter no minimo 3 caracteres');

  });

  test('Testando rota put "/ativos/:id" com quantidade invalida', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "quantidade" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: -10,
    valor: '10.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('Quantidade de ativos invalido');

  });

  test('Testando rota put "/ativos/:id" com valor invalido', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).put('/ativos/:id').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('O campo "valor" é obrigatorio');

  const { status: status2, body: { message: message2 } } = await request(rotas).put('/ativos/1').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '-30.00',
  }).set({ Authorization: token });
  expect(status2).toEqual(400);
  expect(message2).toEqual('O campo "valor" esta invalido');
  });

  test('Testando rota put "/ativos/:id" com ativo inexistente', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  const { status, body: { message } } = await request(rotas).put('/ativos/12').send({
    sigla: 'SMFT3',
    nome: 'SMART FIT',
    quantidade: 1000,
    valor: '30.00'
  }).set({ Authorization: token });
  expect(status).toEqual(400);
  expect(message).toEqual('Ativo não encontrado');
  });
});
