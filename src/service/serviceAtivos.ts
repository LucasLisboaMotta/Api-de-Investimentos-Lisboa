import { decodificaToken } from '../auxiliares/token';
import Ativo from '../database/models/Ativo';

export const retornarTodosAtivosService = async (token: string) => {
  try {
    decodificaToken(token, false);
  } catch {
    decodificaToken(token, true);
  }
  const ativos = await Ativo.findAll();
  return ativos;
};
