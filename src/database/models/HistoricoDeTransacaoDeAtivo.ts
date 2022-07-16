import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Usuario from './Usuario';

class HistoricoDeTransacaoDeAtivo extends Model {
  id!: number;
  usuarioId!: number;
  ativoId!: number;
  quantidade!: number;
  precoUnitario!: number;
  tipoDeTransacao!: string;
}

HistoricoDeTransacaoDeAtivo.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: INTEGER,
    allowNull: false,
  },
  ativoId: {
    type: INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: INTEGER,
    allowNull: false,
  },
  precoUnitario: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  tipoDeTransacao: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'HistoricoDeTransacoesDeAtivos',
  timestamps: false});

Usuario.hasMany(HistoricoDeTransacaoDeAtivo,  { foreignKey: 'usuarioId', as: 'id' })
Ativo.hasMany(HistoricoDeTransacaoDeAtivo,  { foreignKey: 'ativoId', as: 'id' })
  
HistoricoDeTransacaoDeAtivo.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })
HistoricoDeTransacaoDeAtivo.belongsTo(Ativo,  { foreignKey: 'ativoId', as: 'id' })
  

export default HistoricoDeTransacaoDeAtivo;
