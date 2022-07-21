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
const contas = express();
contas.get('/', pegarContaController);
contas.get('/historico', pegarHistoricoController);
export default contas;
