import express from 'express';

import {
  criarContaController,
  deletarContaController,
  editarContaController,
  gerenciarUsuarioController,
  pegarContaController,
  usuariosDoGerenteController,
  usuariosDoGerentePeloIdController,
} from '../controllers/controllerGerente';

import validacaoConta from '../middlewares/validacaoConta';
import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';

const gerentes = express();

gerentes.get('/', pegarContaController);
gerentes.get('/conta', usuariosDoGerenteController);
gerentes.get('/conta/:id', usuariosDoGerentePeloIdController);

gerentes.post('/', validacaoConta, criarContaController);
gerentes.post('/usuario/:id', gerenciarUsuarioController);

gerentes.put('/', validacaoEdicaoDeConta, editarContaController);

gerentes.delete('/', deletarContaController);

export default gerentes;
