import express from 'express';

import {
  criarContaController,
  deletarContaController,
  gerenciarUsuarioController,
  pegarContaController,
  usuariosDoGerenteController,
} from '../controllers/controllerGerente';

import validacaoConta from '../middlewares/validacaoConta';
import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';

const gerentes = express();

gerentes.get('/', pegarContaController);
gerentes.get('/conta', usuariosDoGerenteController);

gerentes.post('/', validacaoConta, criarContaController);
gerentes.post('/usuario/:id', gerenciarUsuarioController);

gerentes.put('/', validacaoEdicaoDeConta, criarContaController);

gerentes.delete('/', deletarContaController);

export default gerentes;
