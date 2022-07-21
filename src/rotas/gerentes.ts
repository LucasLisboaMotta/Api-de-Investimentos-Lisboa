import express from 'express';

import { criarContaController, deletarContaController, pegarContaController } from '../controllers/controllerGerente';

import validacaoConta from '../middlewares/validacaoConta';
import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';

const gerentes = express();

gerentes.get('/', pegarContaController);

gerentes.post('/', validacaoConta, criarContaController);

gerentes.put('/', validacaoEdicaoDeConta, criarContaController);

gerentes.delete('/', deletarContaController);

export default gerentes;
