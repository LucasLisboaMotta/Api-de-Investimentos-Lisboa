import 'express-async-errors';
import express from 'express';
import login from './login';
import investimentos from './investimentos';
import middlewareDeErro from '../middlewares/middlewareDeErro';
import ativos from './ativos';

const rotas = express();

rotas.use(express.json());
rotas.use('/login', login);
rotas.use('/investimentos', investimentos);
rotas.use('/ativos', ativos);

rotas.use(middlewareDeErro);

export default rotas;
