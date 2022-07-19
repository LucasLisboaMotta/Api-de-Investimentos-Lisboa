import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const login = Joi.object().keys({
  sigla: Joi.string().min(5).max(6).required()
    .messages({
      'string.min': 'O campo "sigla" deve ter de 5 a 6 caracteres',
      'string.max': 'O campo "sigla" deve ter de 5 a 6 caracteres',
      'any.required': 'O campo "sigla" é obrigatorio',
    }),
  nome: Joi.string().min(3).required()
    .messages({
      'string.min': 'O campo "nome" deve ter no minimo 6 caracteres',
      'any.required': 'O campo "nome" é obrigatorio',
    }),
  quantidade: Joi.number().min(1).integer().required()
    .messages({
      'number.min': 'Quantidade de ativos invalido',
      'number.integer': 'Quantidade de ativos invalido',
      'any.required': 'O campo "quantidade" é obrigatorio',
    }),
  valor: Joi.number().min(0.01).required()
    .messages({
      'number.min': 'O campor "valor" esta invalido',
      'any.required': 'O campo "valor" é obrigatorio',
    }),
});

const validacaoAtivos = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = login.validate(req.body);
  if (error) throw new ErroPersonalizado(400, error.message);
  req.body.sigla = req.body.sigla.toUpperCase();
  req.body.valor = req.body.valor.toFixed(2);
  return next();
};

export default validacaoAtivos;
