import { Request, Response } from 'express';
import { loginGerenteService, pegarContaService } from '../service/serviceGerente';

export const loginGerenteController = async (req: Request, res: Response) => {
  const token = await loginGerenteService(req.body);
  return res.status(200).json(token);
};

export const pegarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await pegarContaService(token);
  return res.status(200).json(resposta);
};
