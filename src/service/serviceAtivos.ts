import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { decodificaToken, verificaToken } from '../auxiliares/token';
import Ativo from '../database/models/Ativo';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';

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
