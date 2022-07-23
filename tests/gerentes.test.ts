import request from 'supertest';
import rotas from '../src/rotas/index';
const shell = require('shelljs');
import { decode } from 'jsonwebtoken';
import Gerente from '../src/database/models/Gerente';
import GerenteDeUsuario from '../src/database/models/GerenteDeUsuario';
import RecomendacaoDeAtivo from '../src/database/models/RecomendacaoDeAtivo';
import usuarioAtivo from './auxiliares/usuarioAtivo';

describe('Testando rotas "/gerente"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando get "/gerente" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const {status, body} = await request(rotas).get('/gerente').set({ Authorization: token });
    expect(status).toEqual(200);
    expect(body.id).toEqual(2);
    expect(body.nome).toEqual('Carlos');
    expect(body.sobrenome).toEqual('Souza');
    expect(body.email).toEqual('carlossouza@ig.com');
    expect(body.senha).toBeUndefined();
  });

  test('Testando get "gerente" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const {status, body: { message } } = await request(rotas).get('/gerente').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });



  test('Testando post "/gerente" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status, body } = await request(rotas).post('/gerente').send({
      nome: 'Barbara',
      sobrenome: 'Amorim',
      email: 'barbaraamorim@gmail.com',
      senha: '11114444'
    }).set({ Authorization: token });
    expect(status).toEqual(201);

    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const { id, nome, sobrenome, email, senha } = decode(body.token) as dtype;
    expect(id).toEqual(3);
    expect(nome).toEqual('Barbara');
    expect(sobrenome).toEqual('Amorim');
    expect(email).toEqual('barbaraamorim@gmail.com');
    expect(senha).toBeUndefined();

    const gerente = await Gerente.findOne({ where: { id: 3 } });
    expect(gerente).not.toEqual(null);
    expect(gerente?.nome).toEqual('Barbara');
    expect(gerente?.sobrenome).toEqual('Amorim');
    expect(gerente?.email).toEqual('barbaraamorim@gmail.com');
    expect(gerente?.senha).toEqual('11114444');
  });  

  test('Testando rota post "/gerente" com falha no nome', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).post('/gerente').send({
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "nome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/gerente').send({
      nome: 'lu',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "nome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota post "/gerente" com falha no sobrenome', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).post('/gerente').send({
      email: 'lucasmaces@gmail.com',
      nome: 'lucas',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "sobrenome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/gerente').send({
      nome: 'lucas',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'ma',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "sobrenome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota post "/gerente" com falha na senha', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).post('/gerente').send({
      email: 'lucasmaces@gmail.com',
      nome: 'lucas',
      sobrenome: 'macedo', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "senha" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/gerente').send({
      nome: 'lucas',
      email: 'lucasmaces@gmail.com',
      sobrenome: 'macedo',
      senha: '12', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });

  test('Testando rota post "/gerente" com falha no email', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).post('/gerente').send({
      senha: '12345678',
      nome: 'lucas',
      sobrenome: 'macedo', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "email" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).post('/gerente').send({
      nome: 'lucas',
      email: 'lucasmacesgmail.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O "email" esta inválido');

    const {status: status3, body: { message: message3 } } = await request(rotas).post('/gerente').send({
      nome: 'lucas',
      email: 'carlossouza@ig.com',
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status3).toEqual(400);
    expect(message3).toEqual('Email já cadastrado');
  });

  test('Testando post "/gerente" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).post('/gerente').send({
      nome: 'Barbara',
      sobrenome: 'Amorim',
      email: 'barbaraamorim@gmail.com',
      senha: '11114444'
    }).set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });


  test('Testando put "/gerente" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'robertasimoes@live.com',
      senha: '10203040',
    });

    const { status, body } = await request(rotas).put('/gerente').send({
      nome: 'Barbara',
      sobrenome: 'Amorim',
      senha: '11114444'
    }).set({ Authorization: token });
    expect(status).toEqual(200);

    type dtype = { id: number, nome: string, sobrenome: string, email: string, senha?: string };
    const { id, nome, sobrenome, email, senha } = decode(body.token) as dtype;
    expect(id).toEqual(1);
    expect(nome).toEqual('Barbara');
    expect(sobrenome).toEqual('Amorim');
    expect(email).toEqual('robertasimoes@live.com');
    expect(senha).toBeUndefined();

    const gerente = await Gerente.findOne({ where: { id: 1 } });
    expect(gerente).not.toEqual(null);
    expect(gerente?.nome).toEqual('Barbara');
    expect(gerente?.sobrenome).toEqual('Amorim');
    expect(gerente?.email).toEqual('robertasimoes@live.com');
    expect(gerente?.senha).toEqual('11114444');
  }); 
  

  test('Testando rota put "/gerente" com falha no nome', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).put('/gerente').send({
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "nome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/gerente').send({
      nome: 'lu',
      sobrenome: 'macedo',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "nome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota put "/gerente" com falha no sobrenome', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).put('/gerente').send({
      nome: 'lucas',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "sobrenome" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/gerente').send({
      nome: 'lucas',
      sobrenome: 'ma',
      senha: '12345678', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "sobrenome" precisa de no mínimo 3 caracteres');
  });

  test('Testando rota put "/gerente" com falha na senha', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
    const {status, body: { message } } = await request(rotas).put('/gerente').send({
      nome: 'lucas',
      sobrenome: 'macedo', 
    }).set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('O campo "senha" é obrigatorio');

    const {status: status2, body: { message: message2 } } = await request(rotas).put('/gerente').send({
      nome: 'lucas',
      sobrenome: 'macedo',
      senha: '12', 
    }).set({ Authorization: token });
    expect(status2).toEqual(400);
    expect(message2).toEqual('O campo "senha" precisa de no mínimo 8 caracteres');
  });

  test('Testando post "/gerente" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).put('/gerente').send({
      nome: 'Barbara',
      sobrenome: 'Amorim',
      senha: '11114444'
    }).set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando delete "/gerente" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status } = await request(rotas).delete('/gerente').set({ Authorization: token });
    expect(status).toEqual(200);

    const gerente = await Gerente.findOne({ where: { id: 2 } });
    expect(gerente).toEqual(null);

    const relacaoGerenteUsuario = await GerenteDeUsuario.findOne({ where: { gerenteId: 2 } });
    expect(relacaoGerenteUsuario).toEqual(null);

    const recomendacaoAtivo = await RecomendacaoDeAtivo.findOne({ where: { gerenteId: 2 } });
    expect(recomendacaoAtivo).toEqual(null)
  });

  test('Testando delete "/gerente" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).delete('/gerente').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando delete "/gerente" com falha no numero de gerentes', async () => {
    await shell.exec('npm run db:reset');
    await Gerente.destroy({ where: { id: 1 } });
    
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status, body: { message } } = await request(rotas).delete('/gerente').set({ Authorization: token });
    expect(status).toEqual(422);
    expect(message).toEqual('Numero de gerentes insuficiente');
  });
});



describe('Testando rotas "/gerente"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando post "/gerente/usuario/:id" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status } = await request(rotas).post('/gerente/usuario/4').set({ Authorization: token });
    const { status: status2 } = await request(rotas).post('/gerente/usuario/5').set({ Authorization: token });

    expect(status).toEqual(200);
    expect(status2).toEqual(200);

    const usuario1 = await GerenteDeUsuario.findOne({ where: { gerenteId: 2, usuarioId: 4 } });
    expect(usuario1).toEqual(null);

    const usuario2 = await GerenteDeUsuario.findOne({ where: { gerenteId: 2, usuarioId: 5 } });
    expect(usuario2).not.toEqual(null);
  });

  test('Testando post "/gerente/usuario/:id" com falha, ususario ja possui gerente', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });
  
    const { status, body: { message } } = await request(rotas).post('/gerente/usuario/1').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Usuario já possui um gerente');
  });

  test('Testando post "/gerente/usuario/:id" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
  
    const { status, body: { message } } = await request(rotas).post('/gerente/usuario/1').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });
});


describe('Testando rotas "/gerente"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando post "/gerente/conta" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status, body } = await request(rotas).get('/gerente/conta').set({ Authorization: token });
    expect(status).toEqual(200);
    usuarioAtivo.forEach(({ id, nome, sobrenome, email, ativos }, index) => {
      expect(body[index].id).toEqual(id);
      expect(body[index].nome).toEqual(nome);
      expect(body[index].sobrenome).toEqual(sobrenome);
      expect(body[index].email).toEqual(email);
      expect(body[index].ativos).toEqual(ativos);
    });
  });
    

  test('Testando post "/gerente/conta" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).get('/gerente/conta').set({ Authorization: token });
    expect(status).toEqual(401); 
    expect(message).toEqual('Token expirado ou invalido')
  });

  test('Testando post "/gerente/conta" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status, body } = await request(rotas).get('/gerente/conta/2').set({ Authorization: token });
    expect(status).toEqual(200);
    expect(body.id).toEqual(usuarioAtivo[0].id);
    expect(body.nome).toEqual(usuarioAtivo[0].nome);
    expect(body.sobrenome).toEqual(usuarioAtivo[0].sobrenome);
    expect(body.email).toEqual(usuarioAtivo[0].email);
    expect(body.ativos).toEqual(usuarioAtivo[0].ativos);
  });
    

  test('Testando post "/gerente/conta" com falha no token', async () => {
    const { body: { token } } = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });

    const { status, body: { message } } = await request(rotas).get('/gerente/conta/2').set({ Authorization: token });
    expect(status).toEqual(401); 
    expect(message).toEqual('Token expirado ou invalido')
  });

  test('Testando post "/gerente/conta" com sucesso', async () => {
    const { body: { token } } = await request(rotas).post('/login/gerente').send({
      email: 'carlossouza@ig.com',
      senha: '90908080',
    });

    const { status, body: { message } } = await request(rotas).get('/gerente/conta/1').set({ Authorization: token });
    expect(status).toEqual(400);
    expect(message).toEqual('Este usuario não é gerenciado por este gerente');
  });
})

