const shell = require('shelljs');

import Usuario from '../src/database/models/Usuario';
import ContaDoUsuario from '../src/database/models/ContaDoUsuario'
import Gerente from '../src/database/models/Gerente';
import Ativo from '../src/database/models/Ativo';
import AtivosDoUsuario from '../src/database/models/AtivosDoUsuario';
import HistoricoDeTransacaoDeAtivo from '../src/database/models/HistoricoDeTransacaoDeAtivo';
import AtivoFavorito from '../src/database/models/AtivoFavorito';
import HistoricoDeTransacaoBancaria from '../src/database/models/HistoricoDeTransacaoBancaria';
import GerentesDeUsuarios from '../src/database/models/GerenteDeUsuario';
import RecondacaoDeAtivo from '../src/database/models/RecomendacaoDeAtivo';

import tabelaUsuario from './auxiliares/usuarios';
import tabelaContasDosUsuarios from './auxiliares/contas';
import tabelaGerentes from './auxiliares/gerentes';
import tabelaAtivos from './auxiliares/ativos';
import tabelaAtivosDoUsuario from './auxiliares/ativosDosUsuarios';
import tabelaHistoricoDeAtivos from './auxiliares/historicoDeAtivos';
import tabelaAtivoFavorito from './auxiliares/ativosFavoritos';
import tabelaHistoricoBancario from './auxiliares/historicoBancario';
import tabelaGerentesDeUsuarios from './auxiliares/gerentesDeUsuarios';
import tabelaRecomendacao from './auxiliares/recomendacoes';

describe('Testando retorno das models', () => {
  beforeAll(async() => {
    await shell.exec('npm run db:reset');
  });
  test('Testando tabela Usuarios', async () => {
    const retornoModelUsuario = await Usuario.findAll();
    tabelaUsuario.forEach(({nome, sobrenome, email, senha}, index) => {
      expect(retornoModelUsuario[index].nome).toEqual(nome);
      expect(retornoModelUsuario[index].sobrenome).toEqual(sobrenome);
      expect(retornoModelUsuario[index].email).toEqual(email);
      expect(retornoModelUsuario[index].senha).toEqual(senha);
    });
  });

  test('Testando tabela ContasDosUsuarios', async () => {
    const retornoModelContaDoUsuario = await ContaDoUsuario.findAll();
    tabelaContasDosUsuarios.forEach(({usuarioId, saldo}, index) => {
      expect(retornoModelContaDoUsuario[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelContaDoUsuario[index].saldo).toEqual(saldo);
    });
  });

  test('Testando tabela Gerentes', async () => {
    const retornoModelGerente = await Gerente.findAll();
    tabelaGerentes.forEach(({nome, sobrenome, email, senha}, index) => {
      expect(retornoModelGerente[index].nome).toEqual(nome);
      expect(retornoModelGerente[index].sobrenome).toEqual(sobrenome);
      expect(retornoModelGerente[index].email).toEqual(email);
      expect(retornoModelGerente[index].senha).toEqual(senha);
    })
  })

  
  test('Testando tabela AtivosDoUsuario', async () => {
    const retornoModelAtivosDoUsuario = await AtivosDoUsuario.findAll();
    tabelaAtivosDoUsuario.sort((a, b) => Number(a.precoMedioDeCompra) - Number(b.precoMedioDeCompra));
    retornoModelAtivosDoUsuario.sort((a, b) => Number(a.precoMedioDeCompra) - Number(b.precoMedioDeCompra));
    tabelaAtivosDoUsuario.forEach(({usuarioId, ativoId, quantidade, precoMedioDeCompra}, index) => {
      expect(retornoModelAtivosDoUsuario[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelAtivosDoUsuario[index].ativoId).toEqual(ativoId);
      expect(retornoModelAtivosDoUsuario[index].quantidade).toEqual(quantidade);
      expect(retornoModelAtivosDoUsuario[index].precoMedioDeCompra).toEqual(precoMedioDeCompra);
    });
  });

  test('Testando tabela Ativos', async () => {
    const retornoModelAtivo = await Ativo.findAll();
    tabelaAtivos.forEach(({ sigla, nome, quantidade, valor }, index) => {
      expect(retornoModelAtivo[index].sigla).toEqual(sigla);
      expect(retornoModelAtivo[index].nome).toEqual(nome);
      expect(retornoModelAtivo[index].quantidade).toEqual(quantidade);
      expect(retornoModelAtivo[index].valor).toEqual(valor);
    });
  });

  test('Testando tabela HistoricoDeTransacoesDeAtivos', async () => {
    const retornoModelHistoricoAtivo = await HistoricoDeTransacaoDeAtivo.findAll();
    tabelaHistoricoDeAtivos.forEach(({usuarioId, ativoId, quantidade, data, tipoDeTransacao, precoUnitario}, index) => {
      expect(retornoModelHistoricoAtivo[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelHistoricoAtivo[index].ativoId).toEqual(ativoId);
      expect(retornoModelHistoricoAtivo[index].quantidade).toEqual(quantidade);
      expect(retornoModelHistoricoAtivo[index].data).toEqual(data);
      expect(retornoModelHistoricoAtivo[index].tipoDeTransacao).toEqual(tipoDeTransacao);
      expect(retornoModelHistoricoAtivo[index].precoUnitario).toEqual(precoUnitario);
    })
  })

  test('Testando tabela AtivosFavoritos', async () => {
    const retornoModelAtivoFavorito = await AtivoFavorito.findAll();
    type Tsort = {
      usuarioId: number,
      ativoId: number,
    }
    const sort = ({usuarioId, ativoId}: Tsort, {usuarioId: usuarioB, ativoId: ativoB}: Tsort) => {
      if (usuarioId > usuarioB) return 1;
      if (usuarioB > usuarioId) return -1;
      if (ativoId > ativoB) return 1;
      if (ativoB > ativoId) return -1;
      return 0;
    }
    retornoModelAtivoFavorito.sort(sort);
    tabelaAtivoFavorito.sort(sort);
    tabelaAtivoFavorito.forEach(({usuarioId, ativoId}, index) => {
      expect(retornoModelAtivoFavorito[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelAtivoFavorito[index].ativoId).toEqual(ativoId);
    });
  });

  test('Testando tabela HistoricoDeTransacoesBancarias', async () => {
    const retornoModelHistoricoBancario = await HistoricoDeTransacaoBancaria.findAll();
    tabelaHistoricoBancario.forEach(({usuarioId, valor, data, tipo}, index) => {
      expect(retornoModelHistoricoBancario[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelHistoricoBancario[index].valor).toEqual(valor);
      expect(retornoModelHistoricoBancario[index].data).toEqual(data);
      expect(retornoModelHistoricoBancario[index].tipo).toEqual(tipo);
    });
  });


  test('Testando tabela RecomendacoesDeAtivos', async () => {
    type Tsort = {
      ativoId: number,
      gerenteId: number,
    }
    const sort = ({ativoId, gerenteId}: Tsort, {ativoId: ativoB, gerenteId: gerenteB}: Tsort) => {
      if (ativoId > ativoB) return 1;
      if (ativoB > ativoId) return -1;
      if (gerenteId > gerenteB) return 1;
      if (gerenteB > gerenteId) return -1;
      return 0;
    }
    const retornaModelRecomendacao = await RecondacaoDeAtivo.findAll();
    retornaModelRecomendacao.sort(sort);
    tabelaRecomendacao.sort(sort);
    tabelaRecomendacao.forEach(({ gerenteId, ativoId, nota }, index) => {
      expect(retornaModelRecomendacao[index].gerenteId).toEqual(gerenteId);
      expect(retornaModelRecomendacao[index].ativoId).toEqual(ativoId);
      expect(retornaModelRecomendacao[index].nota).toEqual(nota);
    });
  });

  test('Testando tabela GerentesDeUsuarios', async () => {
    type Tsort = {
      usuarioId: number,
      gerenteId: number,
    }
    const sort = ({usuarioId, gerenteId}: Tsort, {usuarioId: usuarioB, gerenteId: gerenteB}: Tsort) => {
      if (usuarioId > usuarioB) return 1;
      if (usuarioB > usuarioId) return -1;
      if (gerenteId > gerenteB) return 1;
      if (gerenteB > gerenteId) return -1;
      return 0;
    }
    const retornoModelGerenteDeUsuario = await GerentesDeUsuarios.findAll();
    retornoModelGerenteDeUsuario.sort(sort);
    tabelaGerentesDeUsuarios.sort(sort);
    tabelaGerentesDeUsuarios.forEach(({usuarioId, gerenteId}, index) => {
      expect(retornoModelGerenteDeUsuario[index].usuarioId).toEqual(usuarioId);
      expect(retornoModelGerenteDeUsuario[index].gerenteId).toEqual(gerenteId);
    });
  });

});
