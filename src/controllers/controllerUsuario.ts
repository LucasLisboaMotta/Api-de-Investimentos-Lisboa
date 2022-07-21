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

export const criarContaController = async (req: Request, res: Response) => {
  const token = await criarContaService(req.body);
  return res.status(201).json(token);
};

export const editarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await editarContaService(token, req.body);
  return res.status(200).json(resposta);
};

export const deletarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  await deletarContaService(token);
  return res.status(200).end();
};

export const depositoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await depositoService(token, req.body.valor);
  return res.status(200).json(resposta);
};

export const saqueController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await saqueService(token, req.body.valor);
  return res.status(200).json(resposta);
};
