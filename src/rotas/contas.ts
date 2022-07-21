import express from 'express';
import {
  criarContaController,
  deletarContaController,
  depositoController,
  editarContaController,
  pegarContaController,
  pegarHistoricoController,
  saqueController,
} from '../controllers/controllerUsuario';
import validacaoConta from '../middlewares/validacaoConta';
import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';
const contas = express();
contas.get('/', pegarContaController);
contas.get('/historico', pegarHistoricoController);
contas.post('/', validacaoConta, criarContaController);
contas.put('/', validacaoEdicaoDeConta, editarContaController);
export default contas;
