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
import validacaoTransacao from '../middlewares/validacaoTransacao';

const contas = express();

contas.get('/', pegarContaController);
contas.get('/historico', pegarHistoricoController);

contas.post('/', validacaoConta, criarContaController);
contas.post('/deposito', validacaoTransacao, depositoController);

contas.put('/', validacaoEdicaoDeConta, editarContaController);

contas.delete('/', deletarContaController);

export default contas;
