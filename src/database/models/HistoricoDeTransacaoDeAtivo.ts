import {
  DATE, Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
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
  data!: Date;
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
  data: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'HistoricoDeTransacoesDeAtivos',
  timestamps: false,
});

HistoricoDeTransacaoDeAtivo.belongsToMany(Usuario, {
  foreignKey: 'usuarioId', as: 'Usuarios', through: HistoricoDeTransacaoDeAtivo, otherKey: 'ativoId',
});
HistoricoDeTransacaoDeAtivo.belongsToMany(Ativo, {
  foreignKey: 'ativoId', as: 'Ativos', through: HistoricoDeTransacaoDeAtivo, otherKey: 'usuarioId',
});

Usuario.hasMany(HistoricoDeTransacaoDeAtivo, { foreignKey: 'usuarioId', as: 'HistoricoDeTransacoesDeAtivo' });
Ativo.hasMany(HistoricoDeTransacaoDeAtivo, { foreignKey: 'ativoId', as: 'HistoricoDeTransacoesDeAtivo' });

export default HistoricoDeTransacaoDeAtivo;
