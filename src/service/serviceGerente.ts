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
