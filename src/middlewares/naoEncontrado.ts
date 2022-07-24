import { Request, Response } from 'express';
import docAPI from '../auxiliares/docAPIT';

const naoEncontrado = (_req: Request, res: Response) => res.status(404).send(docAPI);

export default naoEncontrado;
