import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const login = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'O "email" esta inválido',
    'any.required': 'O campo "email" é obrigatorio',
  }),
  senha: Joi.string().min(8).required().messages({
    'string.min': 'O campo "senha" precisa de no mínimo 8 caracteres',
    'any.required': 'O campo "senha" é obrigatorio',
  }),
});

const validacaoLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = login.validate(req.body);
  if (error) throw new ErroPersonalizado(400, error.message);
  return next();
};

export default validacaoLogin;
