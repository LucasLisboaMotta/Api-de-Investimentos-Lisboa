import { Request, Response } from 'express';
import { retornarTodosAtivosService } from '../service/serviceAtivos';

export const retornarTodosAtivosController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await retornarTodosAtivosService(token);
  return res.status(200).json(resultado);
};
