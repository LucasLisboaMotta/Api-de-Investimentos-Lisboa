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
const contas = express();
contas.get('/', pegarContaController);
contas.get('/historico', pegarHistoricoController);
contas.post('/', validacaoConta, criarContaController);
export default contas;
