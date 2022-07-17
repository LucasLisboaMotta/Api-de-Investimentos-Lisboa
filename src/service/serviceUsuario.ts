import Usuario from '../database/models/Usuario';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { criandoToken } from '../auxiliares/token';

type IloginUsuarioService = {email: string, senha: string}
export const loginUsuarioService = async ({ email, senha }: IloginUsuarioService) => {
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
