import { Request, Response } from 'express';
import { retornaAtivoPeloIdService, retornaAtivosDoUsuarioService, retornarTodosAtivosService } from '../service/serviceAtivos';

export const retornarTodosAtivosController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await retornarTodosAtivosService(token);
  return res.status(200).json(resultado);
};

export const retornaAtivosDoUsuarioController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await retornaAtivosDoUsuarioService(token);
  return res.status(200).json(resultado);
};

export const retornaAtivoPeloIdController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = Number(req.params.id);
  const resultado = await retornaAtivoPeloIdService(token, id);
  return res.status(200).json(resultado);
};
