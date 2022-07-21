import request from 'supertest';
import { decode } from 'jsonwebtoken';
import rotas from '../src/rotas/index';
const shell = require('shelljs');

import historicoBancario from './auxiliares/historicoBancario1';

import Usuario from '../src/database/models/Usuario';
import ContaDoUsuario from '../src/database/models/ContaDoUsuario';
import AtivosDoUsuario from '../src/database/models/AtivosDoUsuario';
import GerenteDeUsuario from '../src/database/models/GerenteDeUsuario';
import AtivoFavorito from '../src/database/models/AtivoFavorito';
import HistoricoDeTransacaoBancaria from '../src/database/models/HistoricoDeTransacaoBancaria';
import HistoricoDeTransacaoDeAtivo from '../src/database/models/HistoricoDeTransacaoDeAtivo';


describe('Testando rotas "/conta"', () => {
  
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });


  test('Testando rota get "/conta" com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const {status, body} = await request(rotas).get('/conta').set({ Authorization: token });
    expect(status).toEqual(200);
    expect(body.id).toEqual(1);
    expect(body.nome).toEqual('João');
    expect(body.sobrenome).toEqual('Silva');
    expect(body.email).toEqual('joaosilva@gmail.com');
    expect(body.saldo).toEqual('300.50');
  });

  test('Testando rota get "/conta" com falha no token', async () => {
    const token = '123456489';
    const {status, body: { message } } = await request(rotas).get('/conta').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando rota get "/conta/historico" com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const {status, body} = await request(rotas).get('/conta/historico').set({ Authorization: token });
    expect(status).toEqual(200);
    historicoBancario.forEach(({id, usuarioId, valor, data, tipo}, index) => {
      expect(body[index].id).toEqual(id);
      expect(body[index].usuarioId).toEqual(usuarioId);
      expect(body[index].valor).toEqual(valor);
      expect(body[index].data).toEqual(data);
      expect(body[index].tipo).toEqual(tipo);
    })
  });

  test('Testando rota get "/conta/historico" com falha no token', async () => {
    const token = '123456489';
    const {status, body: { message } } = await request(rotas).get('/conta/historico').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando rota post "/conta" com sucesso', async () => {
    const {status, body: { token } } = await request(rotas).post('/conta').send({
      nome: 'lucas',
      sobrenome: 'macedo',
      email: 'lucasmacedo@gmail.com',
      senha: 'batataFrita',    
    });
    expect(status).toEqual(201);
    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const { id, nome, sobrenome, email, senha } = decode(token) as dtype;
    expect(id).toEqual(6);
    expect(nome).toEqual('lucas');
    expect(sobrenome).toEqual('macedo');
    expect(email).toEqual('lucasmacedo@gmail.com');
    expect(senha).toBeUndefined();

    const usuario = await Usuario.findOne({ where: { id } });
    expect(usuario).not.toBe(null);
    expect(usuario?.nome).toEqual('lucas');
    expect(usuario?.sobrenome).toEqual('macedo');
    expect(usuario?.email).toEqual('lucasmacedo@gmail.com');
    expect(usuario?.senha).toEqual('batataFrita');

    const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
    expect(conta).not.toBe(null);
    expect(conta?.saldo).toEqual('0.00');
  });

  test('Testando rota post "/conta" com falha no nome', async () => {
    const {status, body: { message } } = await request(rotas).post('/conta').send({
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "nome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/conta').send({
      nome: 'lu',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "nome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota post "/conta" com falha no sobrenome', async () => {
    const {status, body: { message } } = await request(rotas).post('/conta').send({
      email: 'lucasmaces@gmail.com',
      nome: 'lucas',
      senha: '12345678', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "sobrenome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/conta').send({
      nome: 'lucas',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'ma',
      senha: '12345678', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "sobrenome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota post "/conta" com falha na senha', async () => {
    const {status, body: { message } } = await request(rotas).post('/conta').send({
      email: 'lucasmaces@gmail.com',
      nome: 'lucas',
      sobrenome: 'macedo', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "senha" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/conta').send({
      nome: 'lucas',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });

  test('Testando rota post "/conta" com falha no email', async () => {
    const {status, body: { message } } = await request(rotas).post('/conta').send({
      senha: '12345678',
      nome: 'lucas',
      sobrenome: 'macedo', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "email" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/conta').send({
      nome: 'lucas',
      email: 'lucasmacesgmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O "email" esta inválido');

    const {status: status3, body: { message: message3 } } = await request(rotas).post('/conta').send({
      nome: 'lucas',
      email: 'joaosilva@gmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status3).toEqual(400);
    expect(message3).toEqual('Email já cadastrado');
  });

  test('Testando rota put "/conta" com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const {status, body: { token: token2 } } = await request(rotas).put('/conta').send({
      nome: 'lucas',
      sobrenome: 'macedo',
      senha: 'batataFrita',    
    }).set({ Authorization: token });
    expect(status).toEqual(200);
    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const { id, nome, sobrenome, email, senha } = decode(token2) as dtype;
    expect(id).toEqual(1);
    expect(nome).toEqual('lucas');
    expect(sobrenome).toEqual('macedo');
    expect(email).toEqual('joaosilva@gmail.com');
    expect(senha).toBeUndefined();

    const usuario = await Usuario.findOne({ where: { id } });
    expect(usuario).not.toBe(null);
    expect(usuario?.nome).toEqual('lucas');
    expect(usuario?.sobrenome).toEqual('macedo');
    expect(usuario?.email).toEqual('joaosilva@gmail.com');
    expect(usuario?.senha).toEqual('batataFrita');

    const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
    expect(conta).not.toBe(null);
    expect(conta?.saldo).toEqual('300.50');
  });

  test('Testando rota put "/conta" com falha no nome', async () => {
    const {status, body: { message } } = await request(rotas).put('/conta').send({
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "nome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/conta').send({
      nome: 'lu',
      sobrenome: 'macedo',
      senha: '12345678', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "nome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota put "/conta" com falha no sobrenome', async () => {
    const {status, body: { message } } = await request(rotas).put('/conta').send({
      nome: 'lucas',
      senha: '12345678', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "sobrenome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/conta').send({
      nome: 'lucas',
      sobrenome: 'ma',
      senha: '12345678', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "sobrenome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota put "/conta" com falha na senha', async () => {
    const {status, body: { message } } = await request(rotas).put('/conta').send({
      nome: 'lucas',
      sobrenome: 'macedo', 
    });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "senha" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/conta').send({
      nome: 'lucas',
      sobrenome: 'macedo',
      senha: '12', 
    });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });


  test('Testando rota delete "/conta" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joanafurtado@hotmail.com',
      senha: '88445566',
    });
    const { status } = await request(rotas).delete('/conta').set({ Authorization: token });
    expect(status).toEqual(200);
   
    const usuario = await Usuario.findOne({ where: { id: 5 } });
    expect(usuario).toEqual(null);

    const conta = await ContaDoUsuario.findOne({ where: { usuarioId: 5 } });
    expect(conta).toEqual(null);

    const ativo = await AtivosDoUsuario.findOne({ where: { usuarioId: 5 } });
    expect(ativo).toEqual(null);

    const gerente = await GerenteDeUsuario.findOne({ where: { usuarioId: 5 } });
    expect(gerente).toEqual(null);

    const favorito = await AtivoFavorito.findOne({ where: { usuarioId: 5 } });
    expect(favorito).toEqual(null);

    const historicoBancarios = await HistoricoDeTransacaoBancaria.findOne({ where: { usuarioId: 5 } });
    expect(historicoBancarios).toEqual(null);

    const historicoDeAtivo = await HistoricoDeTransacaoDeAtivo.findOne({ where: { usuarioId: 5 } });
    expect(historicoDeAtivo).toEqual(null);
  });

  test('Testando rota delete "/conta" com falha, valores na conta', async () => {
    await AtivosDoUsuario.destroy({ where: { usuarioId: 2 } });
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const { status, body: { message } } = await request(rotas).delete('/conta').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Ainda existe valores na conta do usuario');
  });

  test('Testando rota delete "/conta" com falha, ativos na conta', async () => {
    await ContaDoUsuario.update({ saldo: 0 }, { where: { usuarioId: 4 } });
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'luisaalvez@uol.com',
      senha: '11223344',
    });
    const { status, body: { message } } = await request(rotas).delete('/conta').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Ainda existe ativos na conta do usuario');
  });

  test('Testando rota delete "/conta" com falha no token', async () => {
    const token = '123456789423012154';
    const { status, body: { message } } = await request(rotas).delete('/conta').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });
});

describe('Testando transações nas rotas "/conta"', () => {
  
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });


  test('Testando rota post "/conta/deposito" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const { status, body: { saldo } } = await request(rotas).post('/conta/deposito').send({
      valor: '1000.00'
    }).set({ Authorization: token });
    
    expect(status).toEqual(200);
    expect(saldo).toEqual('1300.50');

    const conta = await ContaDoUsuario.findOne({ where: { usuarioId: 1 } });
    expect(conta?.saldo).toEqual('1300.50');

    const historico = await HistoricoDeTransacaoBancaria.findOne({ where: { id: 25 } });
    expect(historico?.valor).toEqual('1000.00');
    expect(historico?.tipo).toEqual('Deposito');
    expect(historico?.usuarioId).toEqual(1);
  
  });

  test('Testando rota post "/conta/deposito" com falha no valor', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const { status, body: { message } } = await request(rotas).post('/conta/deposito').set({ Authorization: token });

    expect(status).toEqual(400);
    expect(message).toEqual('O campo "valor" é obrigatorio');

    const { status: status2, body: { message: message2 } } = await request(rotas).post('/conta/deposito').send({
      valor: '-1000.00'
    }).set({ Authorization: token });

    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "valor" esta invalido')
  });

  test('Testando rota post "/conta/deposito" com falha no token', async () => {
    const token = '123456467';
    const { status, body: { message } } = await request(rotas).post('/conta/deposito').send({
      valor: '1000.00'
    }).set({ Authorization: token });

    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });



  test('Testando rota post "/conta/saque" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const { status, body: { saldo } } = await request(rotas).post('/conta/saque').send({
      valor: '1000.00'
    }).set({ Authorization: token });
    
    expect(status).toEqual(200);
    expect(saldo).toEqual('1000.10');

    const conta = await ContaDoUsuario.findOne({ where: { usuarioId: 2 } });
    expect(conta?.saldo).toEqual('1000.10');

    const historico = await HistoricoDeTransacaoBancaria.findOne({ where: { id: 26 } });
    expect(historico?.valor).toEqual('1000.00');
    expect(historico?.tipo).toEqual('Saque');
    expect(historico?.usuarioId).toEqual(2);  
  });

  test('Testando rota post "/conta/saque" com falha no saldo', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const { status, body: { message } } = await request(rotas).post('/conta/saque').send({
      valor: '10000.00'
    }).set({ Authorization: token });

    expect(status).toEqual(422);
    expect(message).toEqual('Saldo insuficiente');
  });

  test('Testando rota post "/conta/saque" com falha no valor', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    const { status, body: { message } } = await request(rotas).post('/conta/saque').set({ Authorization: token });

    expect(status).toEqual(400);
    expect(message).toEqual('O campo "valor" é obrigatorio');

    const { status: status2, body: { message: message2 } } = await request(rotas).post('/conta/saque').send({
      valor: '-1000.00'
    }).set({ Authorization: token });

    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "valor" esta invalido')
  });

  test('Testando rota post "/conta/saque" com falha no token', async () => {
    const token = '123456467';
    const { status, body: { message } } = await request(rotas).post('/conta/saque').send({
      valor: '1000.00'
    }).set({ Authorization: token });

    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });
});