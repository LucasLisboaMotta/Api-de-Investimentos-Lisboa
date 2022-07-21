import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import ErroPersonalizado from '../auxiliares/ErroPersonalizado';

const transacao = Joi.object().keys({
  valor: Joi.number().min(0.01).required()
    .messages({
      'number.min': 'O campo "valor" esta invalido',
      'any.required': 'O campo "valor" é obrigatorio',
      'number.base': 'O campo "valor" é obrigatorio',
    }),
});

const validacaoTransacao = (req: Request, _res: Response, next: NextFunction) => {
  req.body.valor = Number(req.body.valor);
  const { error } = transacao.validate(req.body);
  if (error) throw new ErroPersonalizado(400, error.message);
  req.body.valor = req.body.valor.toFixed(2);
  return next();
};

export default validacaoTransacao;
