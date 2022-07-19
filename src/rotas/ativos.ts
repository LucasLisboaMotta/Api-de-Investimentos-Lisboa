import express from 'express';
import { retornarTodosAtivosController } from '../controllers/constrollerAtivos';

const ativos = express();

ativos.get('/', retornarTodosAtivosController);

export default ativos;
