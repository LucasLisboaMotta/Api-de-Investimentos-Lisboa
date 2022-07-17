import HistoricoDeTransacaoBancaria from '../database/models/HistoricoDeTransacaoBancaria';
import ContaDoUsuario from '../database/models/ContaDoUsuario';

const operacoesBancarias = async (valor: number, tipo: string, usuarioId: number) => {
  await HistoricoDeTransacaoBancaria.create({
    usuarioId,
    valor: Math.abs(valor),
    data: Date.now(),
    tipo,
  });
  await ContaDoUsuario.increment({ saldo: valor }, { where: { usuarioId } });
};

export default operacoesBancarias;
