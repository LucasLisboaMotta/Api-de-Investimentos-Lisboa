import request from 'supertest';
import rotas from '../src/rotas/index';
import historicoDeInvestimentos from './auxiliares/historicoDeInvestimentos';
import AtivosDoUsuario from '../src/database/models/AtivosDoUsuario';
import Ativo from '../src/database/models/Ativo';
import ContaDoUsuario from '../src/database/models/ContaDoUsuario';
import HistoricoDeTransaçõesDeAtivos from '../src/database/models/HistoricoDeTransacaoDeAtivo';
import HistoricoDeTransacaoBancaria from '../src/database/models/HistoricoDeTransacaoBancaria';
const shell = require('shelljs');

describe('Testando rota "/investimentos"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });

  test('Testando rota get "/investimentos" com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'luisaalvez@uol.com',
      senha: '11223344',
    });
    const { body, status } = await request(rotas).get('/investimentos').set({ Authorization: token });
    expect(status).toEqual(200);
    historicoDeInvestimentos.forEach(({ativo, quantidade, data, tipoDeTransacao, precoUnitario}, index) => {
      expect(body[index].ativo).toEqual(ativo);
      expect(body[index].quantidade).toEqual(quantidade);
      expect(body[index].data).toEqual(data);
      expect(body[index].tipoDeTransacao).toEqual(tipoDeTransacao);
      expect(body[index].precoUnitario).toEqual(precoUnitario);
    });
  });

  test('Testando rota get "/investimentos" com falha no token', async () => {
    const token = '123456789012345678901234567890';
    const {status, body: {message}} = await request(rotas).get('/investimentos').set({ Authorization: token });
    expect(status).toEqual(401);
    expect(message).toEqual('Token expirado ou invalido');
  });
});

describe('Testando rota post "/investimentos/comprar"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });
  test('Testando compra com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const {status, body} = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 9,
      qtdeAtivo: 20
      }).set({ Authorization: token });
    expect(status).toEqual(201);
    expect(body).toEqual({ codAtivo: 9, qtdeAtivo: 20, valor: '8.38' });
    const ativoDoUsuario = await AtivosDoUsuario.findOne({where: {usuarioId: 2, ativoId: 9}});
    expect(ativoDoUsuario?.quantidade).toEqual(20);
    expect(ativoDoUsuario?.precoMedioDeCompra).toEqual('8.38');
    const ativo = await Ativo.findOne({where: {id: 9}});
    expect(ativo?.quantidade).toEqual(1480);
    const conta = await ContaDoUsuario.findOne({where: {usuarioId: 2}});
    expect(conta?.saldo).toEqual('1832.50');
    const historicoAtivo = await HistoricoDeTransaçõesDeAtivos.findOne({where: {usuarioId: 2, ativoId: 9}});
    expect(historicoAtivo?.quantidade).toEqual(20);
    expect(historicoAtivo?.tipoDeTransacao).toEqual('Compra');
    expect(historicoAtivo?.precoUnitario).toEqual('8.38');
    const historicoBancario = await HistoricoDeTransacaoBancaria.findOne({where: {id: 25}});
    expect(historicoBancario?.usuarioId).toEqual(2);
    expect(historicoBancario?.valor).toEqual('167.60');
    expect(historicoBancario?.tipo).toEqual('Compra');
  });

  test('Testando compra com sucesso, e atualizando o preço medio dos ativos', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'luisaalvez@uol.com',
      senha: '11223344',
    });
    await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 4,
      qtdeAtivo: 200
    }).set({ Authorization: token });
    const ativoDoUsuario = await AtivosDoUsuario.findOne({where: {usuarioId: 4, ativoId: 4}});
    expect(ativoDoUsuario?.quantidade).toEqual(220);
    expect(ativoDoUsuario?.precoMedioDeCompra).toEqual('2.71');
  })

  test('Testando compra com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 9,
      qtdeAtivo: 20
      }).set({ Authorization: token });
      expect(status).toEqual(401);
      expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando compra com falha na requisição', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const semCodAtivo = await request(rotas).post('/investimentos/comprar').send({
      qtdeAtivo: 20
      }).set({ Authorization: token });
    expect(semCodAtivo.status).toEqual(400);
    expect(semCodAtivo.body.message).toEqual('O campo "codAtivo" é obrigatorio');

    const codAtivoInvalido = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: -1,
      qtdeAtivo: 20
    }).set({ Authorization: token });
    expect(codAtivoInvalido.status).toEqual(400);
    expect(codAtivoInvalido.body.message).toEqual('O "codAtivo" esta inválido');

    const semQtdeAtivo = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 1,
    }).set({ Authorization: token });
    expect(semQtdeAtivo.status).toEqual(400);
    expect(semQtdeAtivo.body.message).toEqual('O campo "qtdeAtivo" é obrigatorio');

    const qtdeAtivoInvalido = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 2,
      qtdeAtivo: 3.5,
    }).set({ Authorization: token });
    expect(qtdeAtivoInvalido.status).toEqual(400);
    expect(qtdeAtivoInvalido.body.message).toEqual('Quantidade de ativos invalido');
    });

    test('Testando compra com ativo inexistente', async () => {
      const { body: {token}} = await request(rotas).post('/login/usuario').send({
        email: 'mariaoliveira@yahoo.com.br',
        senha: '87654321',
      });      
      const {status, body: { message }} = await request(rotas).post('/investimentos/comprar').send({
        codAtivo: 13,
        qtdeAtivo: 20
        }).set({ Authorization: token })
        expect(status).toEqual(400);
        expect(message).toEqual('Ativo não encontrado');
    });

   test('Testando compra com quantidade de ativos indisponivel', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });      
    const {status, body: { message }} = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 10,
      qtdeAtivo: 10
      }).set({ Authorization: token });
      expect(status).toEqual(422);
      expect(message).toEqual('Quantidade de ativo indisponivel');
   });

   test('Testando compra com saldo insuficiente', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });      
    const {status, body: { message }} = await request(rotas).post('/investimentos/comprar').send({
      codAtivo: 9,
      qtdeAtivo: 1000
      }).set({ Authorization: token });
      expect(status).toEqual(422);
      expect(message).toEqual('Saldo insuficiente');
   });
});


describe('Testando rota post "/investimentos/vender"', () => {
  beforeAll(async () => {
    await shell.exec('npm run db:reset');
  });
  test('Testando vender com sucesso', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const {status, body} = await request(rotas).post('/investimentos/vender').send({
      codAtivo: 1,
      qtdeAtivo: 80
      }).set({ Authorization: token });
    expect(status).toEqual(201);
    expect(body).toEqual({ codAtivo: 1, qtdeAtivo: 80, valor: '21.77' });
    const ativoDoUsuario = await AtivosDoUsuario.findOne({where: {usuarioId: 2, ativoId: 1}});
    expect(ativoDoUsuario?.quantidade).toEqual(20);
    expect(ativoDoUsuario?.precoMedioDeCompra).toEqual('20.00');
    const ativo = await Ativo.findOne({where: {id: 1}});
    expect(ativo?.quantidade).toEqual(380);
    const conta = await ContaDoUsuario.findOne({where: {usuarioId: 2}});
    expect(conta?.saldo).toEqual('3741.70');
    const historicoAtivo = await HistoricoDeTransaçõesDeAtivos.findOne({where: {id: 19}});
    expect(historicoAtivo?.usuarioId).toEqual(2);
    expect(historicoAtivo?.ativoId).toEqual(1);
    expect(historicoAtivo?.quantidade).toEqual(80);
    expect(historicoAtivo?.tipoDeTransacao).toEqual('Venda');
    expect(historicoAtivo?.precoUnitario).toEqual('21.77');
    const historicoBancario = await HistoricoDeTransacaoBancaria.findOne({where: {id: 25}});
    expect(historicoBancario?.usuarioId).toEqual(2);
    expect(historicoBancario?.valor).toEqual('1741.60');
    expect(historicoBancario?.tipo).toEqual('Venda');
  });

  test('Testando vender todas as unidades de determinado ativo', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'joaosilva@gmail.com',
      senha: '12345678',
    });
    await request(rotas).post('/investimentos/vender').send({
      codAtivo: 1,
      qtdeAtivo: 100
      }).set({ Authorization: token });

      const ativoDoUsuario = await AtivosDoUsuario.findOne({where: {usuarioId: 1, ativoId: 1}});
      expect(ativoDoUsuario).toEqual(null);
  })

  test('Testando vender com falha no token', async () => {
    const token = '123456789123456789123456789';
    const {status, body: { message }} = await request(rotas).post('/investimentos/vender').send({
      codAtivo: 1,
      qtdeAtivo: 20
      }).set({ Authorization: token });
      expect(status).toEqual(401);
      expect(message).toEqual('Token expirado ou invalido');
  });

  test('Testando vender com falha na requisição', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });
    const semCodAtivo = await request(rotas).post('/investimentos/vender').send({
      qtdeAtivo: 20
      }).set({ Authorization: token });
    expect(semCodAtivo.status).toEqual(400);
    expect(semCodAtivo.body.message).toEqual('O campo "codAtivo" é obrigatorio');

    const codAtivoInvalido = await request(rotas).post('/investimentos/vender').send({
      codAtivo: -1,
      qtdeAtivo: 20
    }).set({ Authorization: token });
    expect(codAtivoInvalido.status).toEqual(400);
    expect(codAtivoInvalido.body.message).toEqual('O "codAtivo" esta inválido');

    const semQtdeAtivo = await request(rotas).post('/investimentos/vender').send({
      codAtivo: 1,
    }).set({ Authorization: token });
    expect(semQtdeAtivo.status).toEqual(400);
    expect(semQtdeAtivo.body.message).toEqual('O campo "qtdeAtivo" é obrigatorio');

    const qtdeAtivoInvalido = await request(rotas).post('/investimentos/vender').send({
      codAtivo: 2,
      qtdeAtivo: 3.5,
    }).set({ Authorization: token });
    expect(qtdeAtivoInvalido.status).toEqual(400);
    expect(qtdeAtivoInvalido.body.message).toEqual('Quantidade de ativos invalido');
    });

    test('Testando vender com ativo inexistente', async () => {
      const { body: {token}} = await request(rotas).post('/login/usuario').send({
        email: 'mariaoliveira@yahoo.com.br',
        senha: '87654321',
      });      
      const {status, body: { message }} = await request(rotas).post('/investimentos/vender').send({
        codAtivo: 13,
        qtdeAtivo: 20
        }).set({ Authorization: token })
        expect(status).toEqual(400);
        expect(message).toEqual('Ativo não encontrado');
    });


    test('Testando vender um ativo que o usuario não possui', async () => {
      const { body: {token}} = await request(rotas).post('/login/usuario').send({
        email: 'mariaoliveira@yahoo.com.br',
        senha: '87654321',
      });      
      const {status, body: { message }} = await request(rotas).post('/investimentos/vender').send({
        codAtivo: 10,
        qtdeAtivo: 3
        }).set({ Authorization: token });
        expect(status).toEqual(422);
        expect(message).toEqual('Ativo não disponivel');
     });

    test('Testando vender um ativo em quantidade maior que o usuario possui', async () => {
    const { body: {token}} = await request(rotas).post('/login/usuario').send({
      email: 'mariaoliveira@yahoo.com.br',
      senha: '87654321',
    });      
    const { status, body: { message } } = await request(rotas).post('/investimentos/vender').send({
      codAtivo: 1,
      qtdeAtivo: 200
      }).set({ Authorization: token });
      expect(status).toEqual(422);
      expect(message).toEqual('Quantidade de ativos não disponivel');
   });
});