import { Request, Response } from 'express';
import { investimentoCompraService, investimentoVendaService, listarInvestimentosService } from '../service/serviceInvestimento';

export const investimentoCompraController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await investimentoCompraService(token, req.body);
  return res.status(201).json(resultado);
};

export const investimentoVendaController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await investimentoVendaService(token, req.body);
  return res.status(201).json(resultado);
};

export const listarInvestimentoController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const resultado = await listarInvestimentosService(token);
  return res.status(200).json(resultado);
};
