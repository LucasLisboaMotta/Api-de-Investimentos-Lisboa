import 'dotenv/config';
import express from 'express';
import router from './rotas/index';

const app = express();

app.use(router);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
