import Gerente from '../database/models/Gerente';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { criandoToken } from '../auxiliares/token';

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
