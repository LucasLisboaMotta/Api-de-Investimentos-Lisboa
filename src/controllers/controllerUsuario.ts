import { Request, Response } from 'express';
import { loginUsuarioService } from '../service/serviceUsuario';

export const loginUsuarioController = async (req: Request, res: Response) => {
  const token = await loginUsuarioService(req.body);
  return res.status(200).json(token);
};
