import { Request, Response } from 'express';
import {
  criarContaService,
  deletarContaService,
  editarContaService,
  gerenciarUsuarioService,
  loginGerenteService,
  pegarContaService,
  usuariosDoGerentePeloIdService,
  usuariosDoGerenteService,
} from '../service/serviceGerente';

export const loginGerenteController = async (req: Request, res: Response) => {
  const token = await loginGerenteService(req.body);
  return res.status(200).json(token);
};

export const pegarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await pegarContaService(token);
  return res.status(200).json(resposta);
};

export const criarContaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await criarContaService(token, req.body);
  return res.status(201).json(resposta);
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

export const gerenciarUsuarioController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = Number(req.params.id);
  await gerenciarUsuarioService(token, id);
  return res.status(200).end();
};

export const usuariosDoGerenteController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resposta = await usuariosDoGerenteService(token);
  return res.status(200).json(resposta);
};

export const usuariosDoGerentePeloIdController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = Number(req.params.id);
  const resposta = await usuariosDoGerentePeloIdService(token, id);
  return res.status(200).json(resposta);
};
