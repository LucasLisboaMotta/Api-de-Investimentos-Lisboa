import ErroPersonalizado from '../auxiliares/ErroPersonalizado';
import { decodificaToken } from '../auxiliares/token';
import Ativo from '../database/models/Ativo';
import AtivosDoUsuario from '../database/models/AtivosDoUsuario';
import ContaDoUsuario from '../database/models/ContaDoUsuario';
import HistoricoDeTransacaoBancaria from '../database/models/HistoricoDeTransacaoBancaria';
import HistoricoDeTransacaoDeAtivo from '../database/models/HistoricoDeTransacaoDeAtivo';

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
  const ativosDoUsuario = await AtivosDoUsuario.findOne({
    where: { usuarioId: usuario.id, ativoId: codAtivo },
  });
  if (ativosDoUsuario === null) {
    await AtivosDoUsuario.create({
      usuarioId: usuario.id,
      ativoId: codAtivo,
      quantidade: qtdeAtivo,
      precoMedioDeCompra: ativo.valor,
    });
  } else {
    const quantidade = qtdeAtivo + ativosDoUsuario.quantidade;
    const precoMedioDeCompra = ((
      (ativosDoUsuario.quantidade * ativosDoUsuario.precoMedioDeCompra) + valorTotal) / quantidade);
    await AtivosDoUsuario.update({
      quantidade,
      precoMedioDeCompra,
    }, { where: { usuarioId: usuario.id, ativoId: codAtivo } });
  }
  await Ativo.update({ quantidade: ativo.quantidade - qtdeAtivo }, { where: { id: codAtivo } });
  await ContaDoUsuario.update(
    { saldo: conta.saldo - valorTotal },
    { where: { usuarioId: usuario.id } },
  );
  await HistoricoDeTransacaoBancaria.create({
    usuarioId: usuario.id,
    valor: valorTotal,
    data: Date.now(),
    tipo: 'Compra',
  });
  await HistoricoDeTransacaoDeAtivo.create({
    usuarioId: usuario.id,
    ativoId: codAtivo,
    quantidade: qtdeAtivo,
    data: Date.now(),
    tipoDeTransacao: 'Compra',
    precoUnitario: ativo.valor,
  });

  return {
    codAtivo,
    qtdeAtivo,
    valorAtivo: ativo.valor,
    valorTotalDaCOmpra: valorTotal,
  };
};
