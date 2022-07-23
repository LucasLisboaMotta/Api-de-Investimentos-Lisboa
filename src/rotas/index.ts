import 'express-async-errors';
import express from 'express';
import login from './login';
import investimentos from './investimentos';
import middlewareDeErro from '../middlewares/middlewareDeErro';
import ativos from './ativos';
import contas from './contas';
import gerentes from './gerentes';
import naoEncontrado from '../middlewares/naoEncontrado';

const rotas = express();

rotas.use(express.json());
rotas.use('/login', login);
rotas.use('/investimentos', investimentos);
rotas.use('/ativos', ativos);
rotas.use('/conta', contas);
rotas.use('/gerente', gerentes);
rotas.use('*', naoEncontrado);

rotas.use(middlewareDeErro);

export default rotas;
