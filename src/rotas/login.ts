import express from 'express';
import validacaoLogin from '../middlewares/validacaoLogin';
import { loginGerenteController } from '../controllers/controllerGerente';
import { loginUsuarioController } from '../controllers/controllerUsuario';

const login = express();

login.post('/gerente', validacaoLogin, loginGerenteController);
login.post('/usuario', validacaoLogin, loginUsuarioController);

export default login;
