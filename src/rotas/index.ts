import 'express-async-errors';
import express from 'express';
import login from './login';
import middlewareDeErro from '../middlewares/middlewareDeErro';

const rotas = express();

rotas.use(express.json());
rotas.use('/login', login);

rotas.use(middlewareDeErro);

export default rotas;
