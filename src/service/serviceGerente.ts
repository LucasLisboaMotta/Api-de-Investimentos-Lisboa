import Gerente from '../database/models/Gerente';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { criandoToken, decodificaToken } from '../auxiliares/token';

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
