import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const login = Joi.object().keys({
  codAtivo: Joi.number().min(1).integer().required()
    .messages({
      'number.min': 'O "codAtivo" esta inválido',
      'number.integer': 'O "codAtivo" esta inválido',
      'any.required': 'O campo "codAtivo" é obrigatorio',
    }),
  qtdeAtivo: Joi.number().min(1).integer().required()
    .messages({
      'number.min': 'Quantidade de ativos invalido',
      'number.integer': 'Quantidade de ativos invalido',
      'any.required': 'O campo "qtdeAtivo" é obrigatorio',
    }),
});

const validacaoInvestimentos = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = login.validate(req.body);
  if (error) throw new ErroPersonalizado(400, error.message);
  return next();
};

export default validacaoInvestimentos;
