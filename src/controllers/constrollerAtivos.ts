import { Request, Response } from 'express';
import {
  ativosFavoritosService,
  ativosPopularesService,
  ativosRecomendadosService,
  atualizarAtivoService,
  criarNovoAtivoService,
  favoritarAtivoService,
  retornaAtivoPeloIdService,
  retornaAtivosDoUsuarioService,
  retornarTodosAtivosService,
} from '../service/serviceAtivos';

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

export const criarNovoAtivoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await criarNovoAtivoService(token, req.body);
  return res.status(201).json(resultado);
};

export const atualizarAtivoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = Number(req.params.id);
  const resultado = await atualizarAtivoService(token, id, req.body);
  return res.status(200).json(resultado);
};

export const ativosRecomendadosController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await ativosRecomendadosService(token);
  return res.status(200).json(resultado);
};

export const ativosPopularesController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await ativosPopularesService(token);
  return res.status(200).json(resultado);
};

export const ativosFavoritosController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await ativosFavoritosService(token);
  return res.status(200).json(resultado);
};

export const favoritarAtivoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = Number(req.params.id);
  await favoritarAtivoService(token, id);
  return res.status(200).end();
};
