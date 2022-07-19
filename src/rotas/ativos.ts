import express from 'express';
import {
  criarNovoAtivoController,
  retornaAtivoPeloIdController,
  retornaAtivosDoUsuarioController,
  retornarTodosAtivosController,
} from '../controllers/constrollerAtivos';
import validacaoAtivos from '../middlewares/validacaoAtivo';

const ativos = express();

ativos.get('/', retornarTodosAtivosController);
ativos.get('/meusativos', retornaAtivosDoUsuarioController);
ativos.get('/:id', retornaAtivoPeloIdController);

ativos.post('/', validacaoAtivos, criarNovoAtivoController);

export default ativos;
