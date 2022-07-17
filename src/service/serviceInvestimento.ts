import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import operacoesBancarias from '../auxiliares/operacoesBancarias';
import { decodificaToken } from '../auxiliares/token';
import Ativo from '../database/models/Ativo';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';
import ContaDoUsuario from '../database/models/ContaDoUsuario';
import HistoricoDeTransacaoDeAtivo from '../database/models/HistoricoDeTransacaoDeAtivo';

const compraAivo = async (
  usuarioId: number,
  ativoId: number,
  valor: number,
  quantidade: number,
) => {
  const valorTotal = quantidade * valor;
  const ativosDoUsuario = await AtivosDoUsuario.findOne({ where: { usuarioId, ativoId } });
  if (ativosDoUsuario === null) {
    await AtivosDoUsuario.create({
      usuarioId, ativoId, quantidade, precoMedioDeCompra: valor,
    });
  } else {
    const novaQuantidade = quantidade + ativosDoUsuario.quantidade;
    const precoMedioDeCompra = ((
      (ativosDoUsuario.quantidade * ativosDoUsuario.precoMedioDeCompra)
      + valorTotal)
      / novaQuantidade
    );
    await AtivosDoUsuario.update({
      quantidade: novaQuantidade,
      precoMedioDeCompra,
    }, { where: { usuarioId, ativoId } });
  }
  await Ativo.decrement({ quantidade }, { where: { id: ativoId } });
  await HistoricoDeTransacaoDeAtivo.create({
    usuarioId, ativoId, quantidade, data: Date.now(), tipoDeTransacao: 'Compra', precoUnitario: valor,
  });
};

type IinvestimentoCompra = { codAtivo: number, qtdeAtivo: number};
export const investimentoCompraService = async (
  token: string,
  { codAtivo, qtdeAtivo }: IinvestimentoCompra,
) => {
  const usuario = decodificaToken(token, false);
  const ativo = await Ativo.findOne({ where: { id: codAtivo } });
  if (ativo === null) throw new ErroPersonalizado(400, 'Ativo não encontrado');
  if (ativo.quantidade < qtdeAtivo) throw new ErroPersonalizado(422, 'Quantidade de ativo indisponivel');
  const conta = await ContaDoUsuario.findOne({ where: { usuarioId: usuario.id } });
  const valorTotal = qtdeAtivo * ativo.valor;
  if (Number(conta.saldo) < valorTotal) throw new ErroPersonalizado(422, 'Saldo insuficiente');
  await compraAivo(usuario.id, codAtivo, ativo.valor, qtdeAtivo);
  await operacoesBancarias((valorTotal * -1), 'Compra', usuario.id);
  return { codAtivo, qtdeAtivo, valor: ativo.valor };
};
