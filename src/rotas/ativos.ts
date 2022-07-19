import express from 'express';
import {
  ativosFavoritosController,
  ativosPopularesController,
  ativosRecomendadosController,
  atualizarAtivoController,
  criarNovoAtivoController,
  favoritarAtivoController,
  retornaAtivoPeloIdController,
  retornaAtivosDoUsuarioController,
  retornarTodosAtivosController,
} from '../controllers/constrollerAtivos';
import validacaoAtivos from '../middlewares/validacaoAtivo';

const ativos = express();

ativos.get('/', retornarTodosAtivosController);
ativos.get('/meusativos', retornaAtivosDoUsuarioController);
ativos.get('/recomendados', ativosRecomendadosController);
ativos.get('/populares', ativosPopularesController);
ativos.get('/favoritos', ativosFavoritosController);
ativos.get('/:id', retornaAtivoPeloIdController);

ativos.post('/', validacaoAtivos, criarNovoAtivoController);
ativos.post('/favoritos/:id', favoritarAtivoController);

ativos.put('/:id', validacaoAtivos, atualizarAtivoController);

export default ativos;
