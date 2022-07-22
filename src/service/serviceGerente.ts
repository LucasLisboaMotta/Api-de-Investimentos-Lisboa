import Gerente from '../database/models/Gerente';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { criandoToken, decodificaToken } from '../auxiliares/token';
import GerenteDeUsuario from '../database/models/GerenteDeUsuario';
import RecomendacaoDeAtivo from '../database/models/RecomendacaoDeAtivo';
import Usuario from '../database/models/Usuario';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';
import Ativo from '../database/models/Ativo';

type IloginGerenteService = {email: string, senha: string}
export const loginGerenteService = async ({ email, senha }: IloginGerenteService) => {
  const gerente = await Gerente.findOne({ where: { email, senha } });
  if (gerente === null) throw new ErroPersonalizado(400, '"email" ou "senha" incorreta');
  const novoGerente = {
    id: gerente.id,
    sobrenome: gerente.sobrenome,
    nome: gerente.nome,
    email: gerente.email,
  };
  const token = criandoToken(novoGerente, true);
  return { token };
};

export const pegarContaService = async (token: string) => {
  const { id } = decodificaToken(token, true);
  const usuario = await Gerente.findOne({ where: { id } });
  if (usuario === null) throw new ErroPersonalizado(400, 'Gerente não encontrado');
  return {
    id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email,
  };
};

type contaType = { nome: string, sobrenome: string, email: string, senha: string };
export const criarContaService = async (
  token: string,
  {
    nome, sobrenome, email, senha,
  }: contaType,
) => {
  decodificaToken(token, true);
  const verificaEmail = await Gerente.findOne({ where: { email } });
  if (verificaEmail !== null) throw new ErroPersonalizado(400, 'Email já cadastrado');
  const usuario = await Gerente.create({
    nome, sobrenome, email, senha,
  });
  const novoGerente = {
    id: usuario.id, nome, sobrenome, email,
  };
  const novoToken = criandoToken(novoGerente, false);
  return { token: novoToken };
};

type editarContaTyper = { nome: string, sobrenome: string, senha: string }
export const editarContaService = async (
  token: string,
  { nome, sobrenome, senha }: editarContaTyper,
) => {
  const { id, email } = decodificaToken(token, true);
  await Gerente.update({ nome, sobrenome, senha }, { where: { id } });
  const novoUsuario = {
    id, nome, sobrenome, email,
  };
  const novoToken = criandoToken(novoUsuario, false);
  return { token: novoToken };
};

export const deletarContaService = async (token: string) => {
  const { id } = decodificaToken(token, true);
  const gerente = await Gerente.findOne({ where: { id } });
  if (gerente === null) throw new ErroPersonalizado(400, 'Gerente não encontrado');
  const todosGerentes = await Gerente.findAll();
  if (todosGerentes.length < 2) throw new ErroPersonalizado(422, 'Numero de gerentes insuficiente');
  await GerenteDeUsuario.destroy({ where: { gerenteId: id } });
  await RecomendacaoDeAtivo.destroy({ where: { gerenteId: id } });
  await Gerente.destroy({ where: { id } });
};

export const gerenciarUsuarioService = async (token: string, usuarioId: number) => {
  const { id } = decodificaToken(token, true);
  const gerenteUsuario = await GerenteDeUsuario.findOne({ where: { usuarioId } });
  if (gerenteUsuario !== null && gerenteUsuario.gerenteId !== id) throw new ErroPersonalizado(400, 'Usuario já possui um gerente');
  if (gerenteUsuario === null) await GerenteDeUsuario.create({ gerenteId: id, usuarioId });
  else await GerenteDeUsuario.destroy({ where: { gerenteId: id, usuarioId } });
};

export const usuariosDoGerenteService = async (token: string) => {
  const { id } = decodificaToken(token, true);
  const usuariosIds = await GerenteDeUsuario.findAll({ where: { gerenteId: id } });

  const usuarios = usuariosIds.map(async ({ usuarioId }) => {
    const usuario = await Usuario.findOne({ where: { id: usuarioId }, attributes: { exclude: ['senha'] } });
    if (usuario === null) return;
    const ativosDoUsuario = await AtivosDoUsuario.findAll({ where: { usuarioId: usuario.id } });

    const ativos = await Promise.all(ativosDoUsuario
      .map(async ({ ativoId, quantidade, precoMedioDeCompra }) => {
        const ativo = await Ativo.findOne({ where: { id: ativoId } });
        return { ativo, quantidade, precoMedioDeCompra };
      }));

    return ({
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      ativos,
    });
  });

  return Promise.all(usuarios);
};

export const usuariosDoGerentePeloIdService = async (token: string, usuarioId: number) => {
  const { id } = decodificaToken(token, true);
  const relacaoUsuarioGerente = await GerenteDeUsuario
    .findOne({ where: { gerenteId: id, usuarioId } });
  if (relacaoUsuarioGerente === null) throw new ErroPersonalizado(400, 'Este usuario não é gerenciado por este gerente');
  const usuario = await Usuario.findOne({ where: { id: usuarioId }, attributes: { exclude: ['senha'] } });

  const ativosDoUsuario = await AtivosDoUsuario.findAll({ where: { usuarioId: usuario?.id } });

  const ativos = await Promise.all(ativosDoUsuario
    .map(async ({ ativoId, quantidade, precoMedioDeCompra }) => {
      const ativo = await Ativo.findOne({ where: { id: ativoId } });
      return { ativo, quantidade, precoMedioDeCompra };
    }));

  return ({
    id: usuario?.id,
    nome: usuario?.nome,
    sobrenome: usuario?.sobrenome,
    email: usuario?.email,
    ativos,
  });
};
