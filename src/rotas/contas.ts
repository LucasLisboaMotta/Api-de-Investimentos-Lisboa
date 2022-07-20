import express from 'express';
const contas = express();
contas.get('/', pegarContaController);
export default contas;
