import request from 'supertest';
import rotas from '../src/rotas/index';
import { decode } from 'jsonwebtoken';
const shell = require('shelljs');

describe('Testando rotas "/login"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando "/login/usuario" com sucesso', async () => {
    const loginUsuario = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    expect(loginUsuario.statusCode).toEqual(200);
    expect(Object.keys(loginUsuario.body)).toEqual(['token']);
    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const decodeResposta = decode(loginUsuario.body.token) as dtype;
    expect(decodeResposta.id).toEqual(1);
    expect(decodeResposta.nome).toEqual('João');
    expect(decodeResposta.sobrenome).toEqual('Silva');
    expect(decodeResposta.email).toEqual('joaosilva@gmail.com');
    expect(decodeResposta.senha).toBeUndefined();
  })

  test('Testando "/login/usuario" com email invalido', async () => {
    const loginUsuario = await request(rotas).post('/login/usuario').send({
      senha: '12345678',
    });
    expect(loginUsuario.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario.body)).toEqual(['message']);
    expect(loginUsuario.body.message).toEqual('O campo "email" é obrigatorio');
    const loginUsuario2 = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva',
      senha: '12345678',
    });
    expect(loginUsuario2.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario2.body)).toEqual(['message']);
    expect(loginUsuario2.body.message).toEqual('O "email" esta inválido');
  });

  test('Testando "/login/usuario" com senha invalida', async () => {
    const loginUsuario = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
    });
    expect(loginUsuario.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario.body)).toEqual(['message']);
    expect(loginUsuario.body.message).toEqual('O campo "senha" é obrigatorio');
    const loginUsuario2 = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '1234567',
    });
    expect(loginUsuario2.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario2.body)).toEqual(['message']);
    expect(loginUsuario2.body.message).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });

  test('Testando "/login/usuario" com dados incorretos', async () => {
    const loginUsuario = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '87654321'
    });
    expect(loginUsuario.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario.body)).toEqual(['message']);
    expect(loginUsuario.body.message).toEqual('"email" ou "senha" incorreta');
    const loginUsuario2 = await request(rotas).post('/login/usuario').send({
      email: 'silvajoao@gmail.com',
      senha: '12345678',
    });
    expect(loginUsuario2.statusCode).toEqual(400);
    expect(Object.keys(loginUsuario2.body)).toEqual(['message']);
    expect(loginUsuario2.body.message).toEqual('"email" ou "senha" incorreta');
  });

  test('Testando "/login/gerente" com sucesso', async () => {
    const loginGerente = await request(rotas).post('/login/gerente').send({
      email: 'robertasimoes@live.com',
      senha: '10203040',
    });
    expect(loginGerente.statusCode).toEqual(200);
    expect(Object.keys(loginGerente.body)).toEqual(['token']);
    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const decodeResposta = decode(loginGerente.body.token) as dtype;
    expect(decodeResposta.id).toEqual(1);
    expect(decodeResposta.nome).toEqual('Roberta');
    expect(decodeResposta.sobrenome).toEqual('Simões');
    expect(decodeResposta.email).toEqual('robertasimoes@live.com');
    expect(decodeResposta.senha).toBeUndefined();
  });

  test('Testando "/login/gerente" com email invalido', async () => {
    const loginGerente = await request(rotas).post('/login/gerente').send({
      senha: '10203040',
    });
    expect(loginGerente.statusCode).toEqual(400);
    expect(Object.keys(loginGerente.body)).toEqual(['message']);
    expect(loginGerente.body.message).toEqual('O campo "email" é obrigatorio');
    const loginGerente2 = await request(rotas).post('/login/gerente').send({
      email: 'robertasimoes',
      senha: '10203040',
    });
    expect(loginGerente2.statusCode).toEqual(400);
    expect(Object.keys(loginGerente2.body)).toEqual(['message']);
    expect(loginGerente2.body.message).toEqual('O "email" esta inválido');
  });

  test('Testando "/login/gerente" com senha invalida', async () => {
    const loginGerente = await request(rotas).post('/login/gerente').send({
      email: 'robertasimoes@live.com',
    });
    expect(loginGerente.statusCode).toEqual(400);
    expect(Object.keys(loginGerente.body)).toEqual(['message']);
    expect(loginGerente.body.message).toEqual('O campo "senha" é obrigatorio');
    const loginGerente2 = await request(rotas).post('/login/gerente').send({
      email: 'robertasimoes@live.com',
      senha: '1020304',
    });
    expect(loginGerente2.statusCode).toEqual(400);
    expect(Object.keys(loginGerente2.body)).toEqual(['message']);
    expect(loginGerente2.body.message).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });

  test('Testando "/login/gerente" com dados incorretos', async () => {
    const loginGerente = await request(rotas).post('/login/gerente').send({
      email: 'joaosilva@gmail.com',
      senha: '87654321'
    });
    expect(loginGerente.statusCode).toEqual(400);
    expect(Object.keys(loginGerente.body)).toEqual(['message']);
    expect(loginGerente.body.message).toEqual('"email" ou "senha" incorreta');
    const loginGerente2 = await request(rotas).post('/login/gerente').send({
      email: 'silvajoao@gmail.com',
      senha: '12345678',
    });
    expect(loginGerente2.statusCode).toEqual(400);
    expect(Object.keys(loginGerente2.body)).toEqual(['message']);
    expect(loginGerente2.body.message).toEqual('"email" ou "senha" incorreta');
  });
});