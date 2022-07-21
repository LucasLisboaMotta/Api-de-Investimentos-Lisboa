import express from 'express';

import { criarContaController, pegarContaController } from '../controllers/controllerGerente';

import validacaoConta from '../middlewares/validacaoConta';
// import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';

const gerentes = express();

gerentes.get('/', pegarContaController);

gerentes.post('/', validacaoConta, criarContaController);

export default gerentes;
