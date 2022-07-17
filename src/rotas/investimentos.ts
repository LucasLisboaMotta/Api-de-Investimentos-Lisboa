import express from 'express';
import { investimentoCompraController, investimentoVendaController, listarInvestimentoController } from '../controllers/controllerInvestimento';
import validacaoInvestimentos from '../middlewares/validacaoInvestimentos';

const investimentos = express();

investimentos.post('/comprar', validacaoInvestimentos, investimentoCompraController);
investimentos.post('/vender', validacaoInvestimentos, investimentoVendaController);
investimentos.get('/', listarInvestimentoController);

export default investimentos;
