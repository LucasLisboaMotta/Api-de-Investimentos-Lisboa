import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { decodificaToken, verificaToken } from '../auxiliares/token';
import Ativo from '../database/models/Ativo';
import AtivoFavorito from '../database/models/AtivoFavorito';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';
import GerenteDeUsuario from '../database/models/GerenteDeUsuario';
import HistoricoDeTransacaoDeAtivo from '../database/models/HistoricoDeTransacaoDeAtivo';
import RecomendacaoDeAtivo from '../database/models/RecomendacaoDeAtivo';

export const retornarTodosAtivosService = async (token: string) => {
  verificaToken(token);
  const ativos = await Ativo.findAll();
  return ativos;
};

export const retornaAtivosDoUsuarioService = async (token: string) => {
  const usuario = decodificaToken(token, false);
  const ativosDoUsuario = await AtivosDoUsuario.findAll({ where: { usuarioId: usuario.id } });
  const ativos = Promise.all(ativosDoUsuario
    .map(async ({ ativoId, quantidade, precoMedioDeCompra }) => {
      const ativo = await Ativo.findOne({ where: { id: ativoId } });
      return { ativo, quantidade, precoMedioDeCompra };
    }));
  return ativos;
};

export const retornaAtivoPeloIdService = async (token:string, id: number) => {
  verificaToken(token);
  const ativo = await Ativo.findOne({ where: { id } });
  if (ativo === null) throw new ErroPersonalizado(400, 'Ativo não encontrado');
  return ativo;
};

type ativoType = { sigla: string, nome: string, quantidade: number, valor: string }
export const criarNovoAtivoService = async (token: string, novoAtivo: ativoType) => {
  decodificaToken(token, true);
  const verificaAtivo = await Ativo.findOne({ where: { sigla: novoAtivo.sigla } });
  if (verificaAtivo !== null) throw new ErroPersonalizado(400, 'Ativo ja existente');
  const ativo = Ativo.create(novoAtivo);
  return ativo;
};

export const atualizarAtivoService = async (token: string, id: number, ativo: ativoType) => {
  decodificaToken(token, true);
  const verificarAtivo = await Ativo.findOne({ where: { id } });
  if (verificarAtivo === null) throw new ErroPersonalizado(400, 'Ativo não encontrado');
  const ativoAtualizado = await Ativo.update(ativo, { where: { id } });
  return ativoAtualizado;
};

export const ativosRecomendadosService = async (token: string) => {
  const usuario = decodificaToken(token, false);
  const gerente = await GerenteDeUsuario.findOne({ where: { usuarioId: usuario.id } });
  if (gerente === null) throw new ErroPersonalizado(400, 'Usuario não possui nenhum gerente');
  const recomendados = await RecomendacaoDeAtivo
    .findAll({ where: { gerenteId: gerente.gerenteId } });
  const recomendacoesDeAtivos = await Promise.all(recomendados.map(async ({ ativoId, nota }) => {
    const ativo = await Ativo.findOne({ where: { id: ativoId } });
    return {
      id: ativoId,
      sigla: ativo?.sigla,
      nome: ativo?.nome,
      quantidade: ativo?.quantidade,
      valor: ativo?.valor,
      nota,
    };
  }));
  recomendacoesDeAtivos.sort((a, b) => b.nota - a.nota);
  return recomendacoesDeAtivos;
};

export const ativosPopularesService = async (token: string) => {
  verificaToken(token);
  const transacoes = await HistoricoDeTransacaoDeAtivo.findAll();
  let contagem: number[][] = [];
  transacoes.forEach(({ ativoId }) => {
    const ativo = contagem.find(([id]) => ativoId === id);
    if (ativo === undefined) contagem = [...contagem, [ativoId, 1]];
    else {
      const novaContagem = contagem.filter(([id]) => ativoId !== id);
      contagem = [...novaContagem, [ativoId, ativo[1] + 1]];
    }
  });
  contagem.sort((a, b) => b[1] - a[1]);
  const ativosFavoritos = contagem.map(([id]) => Ativo.findOne({ where: { id } }));
  return Promise.all(ativosFavoritos);
};

export const ativosFavoritosService = async (token: string) => {
  const usuario = decodificaToken(token, false);
  const favoritos = await AtivoFavorito.findAll({ where: { usuarioId: usuario.id } });
  const ativos = favoritos.map(({ ativoId }) => Ativo.findOne({ where: { id: ativoId } }));
  return Promise.all(ativos);
};

export const favoritarAtivoService = async (token: string, ativoId: number) => {
  const usuario = decodificaToken(token, false);
  const favorito = await AtivoFavorito.findOne({ where: { usuarioId: usuario.id, ativoId } });
  if (favorito === null) await AtivoFavorito.create({ ativoId, usuarioId: usuario.id });
  else await AtivoFavorito.destroy({ where: { usuarioId: usuario.id, ativoId } });
};
