import { Request, Response } from 'express';
import { loginGerenteService } from '../service/serviceGerente';

export const loginGerenteController = async (req: Request, res: Response) => {
  const token = await loginGerenteService(req.body);
  return res.status(200).json(token);
};
