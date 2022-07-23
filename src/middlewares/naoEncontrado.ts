import { Request, Response } from 'express';

const naoEncontrado = (_req: Request, res: Response) => res.status(404).send('Rota não encontrada');

export default naoEncontrado;
