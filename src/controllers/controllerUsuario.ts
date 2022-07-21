import { Request, Response } from 'express';
import {
  criarContaService,
  deletarContaService,
  depositoService,
  editarContaService,
  loginUsuarioService,
  pegarContaService,
  pegarHistoricoService,
  saqueService,
} from '../service/serviceUsuario';

export const loginUsuarioController = async (req: Request, res: Response) => {
  const token = await loginUsuarioService(req.body);
  return res.status(200).json(token);
};

export const pegarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await pegarContaService(token);
  return res.status(200).json(resposta);
};

export const pegarHistoricoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await pegarHistoricoService(token);
  return res.status(200).json(resposta);
};
