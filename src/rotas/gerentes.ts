import express from 'express';

import { pegarContaController } from '../controllers/controllerGerente';

// import validacaoConta from '../middlewares/validacaoConta';
// import validacaoEdicaoDeConta from '../middlewares/validacaoEdicaoDeConta';

const gerentes = express();

gerentes.get('/', pegarContaController);

export default gerentes;
