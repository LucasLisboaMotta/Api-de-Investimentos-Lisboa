import express from 'express';
import { retornaAtivoPeloIdController, retornaAtivosDoUsuarioController, retornarTodosAtivosController } from '../controllers/constrollerAtivos';

const ativos = express();

ativos.get('/', retornarTodosAtivosController);
ativos.get('/meusativos', retornaAtivosDoUsuarioController);
ativos.get('/:id', retornaAtivoPeloIdController);

export default ativos;
