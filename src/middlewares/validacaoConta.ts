import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const conta = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'O "email" esta inválido',
    'any.required': 'O campo "email" é obrigatorio',
  }),
  senha: Joi.string().min(8).required().messages({
    'string.min': 'O campo "senha" precisa de no mínimo 8 caracteres',
    'any.required': 'O campo "senha" é obrigatorio',
  }),
  nome: Joi.string().min(3).required().messages({
    'string.min': 'O campo "nome" precisa de no mínimo 3 caracteres',
    'any.required': 'O campo "nome" é obrigatorio',
  }),
  sobrenome: Joi.string().min(3).required().messages({
    'string.min': 'O campo "sobrenome" precisa de no mínimo 3 caracteres',
    'any.required': 'O campo "sobrenome" é obrigatorio',
  }),
});

const validacaoConta = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = conta.validate(req.body);
  if (error) throw new ErroPersonalizado(400, error.message);
  return next();
};

export default validacaoConta;
