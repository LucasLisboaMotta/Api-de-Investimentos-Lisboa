import Usuario from '../database/models/Usuario';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { criandoToken, decodificaToken } from '../auxiliares/token';
import ContaDoUsuario from '../database/models/ContaDoUsuario';
import HistoricoDeTransacaoBancaria from '../database/models/HistoricoDeTransacaoBancaria';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';
import AtivoFavorito from '../database/models/AtivoFavorito';
import GerenteDeUsuario from '../database/models/GerenteDeUsuario';
import HistoricoDeTransacaoDeAtivo from '../database/models/HistoricoDeTransacaoDeAtivo';
import operacoesBancarias from '../auxiliares/operacoesBancarias';

type loginUsuarioType = { email: string, senha: string };
export const loginUsuarioService = async ({ email, senha }: loginUsuarioType) => {
  const usuario = await Usuario.findOne({ where: { email, senha } });
  if (usuario === null) throw new ErroPersonalizado(400, '"email" ou "senha" incorreta');
  const novoUsuario = {
    id: usuario.id,
    sobrenome: usuario.sobrenome,
    nome: usuario.nome,
    email: usuario.email,
  };
  const token = criandoToken(novoUsuario, false);
  return { token };
};

export const pegarContaService = async (token: string) => {
  const { id } = decodificaToken(token, false);
  const usuario = await Usuario.findOne({ where: { id } });
  if (usuario === null) throw new ErroPersonalizado(400, 'Usuario não encontrado');
  const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
  return {
    id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email, saldo: conta?.saldo,
  };
};

export const pegarHistoricoService = async (token: string) => {
  const { id } = decodificaToken(token, false);
  const historico = await HistoricoDeTransacaoBancaria.findAll({ where: { usuarioId: id } });
  return historico;
};

type contaType = { nome: string, sobrenome: string, email: string, senha: string };
export const criarContaService = async ({
  nome, sobrenome, email, senha,
}: contaType) => {
  const verificaEmail = await Usuario.findOne({ where: { email } });
  if (verificaEmail !== null) throw new ErroPersonalizado(400, 'Email já cadastrado');
  const usuario = await Usuario.create({
    nome, sobrenome, email, senha,
  });
  await ContaDoUsuario.create({ usuarioId: usuario.id, saldo: 0 });
  const novoUsuario = {
    id: usuario.id, nome, sobrenome, email,
  };
  const token = criandoToken(novoUsuario, false);
  return { token };
};

type editarContaTyper = { nome: string, sobrenome: string, senha: string }
export const editarContaService = async (
  token: string,
  { nome, sobrenome, senha }: editarContaTyper,
) => {
  const { id, email } = decodificaToken(token, false);
  await Usuario.update({ nome, sobrenome, senha }, { where: { id } });
  const novoUsuario = {
    id, nome, sobrenome, email,
  };
  const novoToken = criandoToken(novoUsuario, false);
  return { token: novoToken };
};

export const deletarContaService = async (token: string) => {
  const { id } = decodificaToken(token, false);
  const usuario = await Usuario.findOne({ where: { id } });
  if (usuario === null) throw new ErroPersonalizado(400, 'Usuario não encontrado');
  const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
  if (Number(conta?.saldo) > 0) throw new ErroPersonalizado(400, 'Ainda existe valores na conta do usuario');
  const ativos = await AtivosDoUsuario.findAll({ where: { usuarioId: id } });
  if (ativos.length > 0) throw new ErroPersonalizado(400, 'Ainda existe ativos na conta do usuario');
  await Usuario.destroy({ where: { id } });
  await ContaDoUsuario.destroy({ where: { usuarioId: id } });
  await AtivoFavorito.destroy({ where: { usuarioId: id } });
  await GerenteDeUsuario.destroy({ where: { usuarioId: id } });
  await HistoricoDeTransacaoBancaria.destroy({ where: { usuarioId: id } });
  await HistoricoDeTransacaoDeAtivo.destroy({ where: { usuarioId: id } });
};

export const depositoService = async (token: string, valor: number) => {
  const { id } = decodificaToken(token, false);
  const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
  if (conta === null) throw new ErroPersonalizado(400, 'Usuario não encontrado');
  const saldo = (Number(valor) + Number(conta.saldo)).toFixed(2);
  await operacoesBancarias(valor, 'Deposito', id);
  return { saldo };
};

export const saqueService = async (token: string, valor: number) => {
  const { id } = decodificaToken(token, false);
  const conta = await ContaDoUsuario.findOne({ where: { usuarioId: id } });
  if (conta === null) throw new ErroPersonalizado(400, 'Usuario não encontrado');
  if (Number(conta.saldo) < Number(valor)) throw new ErroPersonalizado(422, 'Saldo insuficiente');
  const saldo = (Number(conta.saldo) - Number(valor)).toFixed(2);
  await operacoesBancarias(valor * -1, 'Saque', id);
  return { saldo };
};
