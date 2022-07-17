import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const middlewareDeErro = (
  erro: ErroPersonalizado,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (erro.status) return res.status(erro.status).json({ message: erro.message });
  return res.status(500).json({ message: 'Erro interno do servidor' });
};

export default middlewareDeErro;
