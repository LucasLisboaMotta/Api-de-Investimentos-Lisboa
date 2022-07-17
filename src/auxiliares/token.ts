import 'dotenv/config';
import jwt, { SignOptions } from 'jsonwebtoken';
import ErroPersonalizado from './ErroPersonalizado';

const segredoUsuario = String(process.env.SECRET);
const segredoGerente = String(process.env.MANAGERSECRET);
const configuracao = { expiresIn: '6h' } as SignOptions;
type Ipayload = { nome: string, sobrenome: string, email: string, id: number };

export const criandoToken = (payload: Ipayload, gerente: boolean) => {
  const segredo = gerente ? segredoGerente : segredoUsuario;
  const token = jwt.sign(payload, segredo, configuracao);
  return token;
};

export const decodificaToken = (token: string, gerente: boolean) => {
  const segredo = gerente ? segredoGerente : segredoUsuario;
  try {
    jwt.verify(token, segredo, configuracao);
  } catch {
    throw new ErroPersonalizado(401, 'Token expirado ou invalido');
  }
  const payload = jwt.decode(token);
  return payload as Ipayload;
};
