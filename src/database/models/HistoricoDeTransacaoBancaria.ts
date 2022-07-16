import {
  DATE, Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
import db from '.';
import Usuario from './Usuario';

class HistoricoDeTransacaoBancaria extends Model {
  id!: number;
  usuarioId!: number;
  valor!: number;
  data!: Date;
  tipo!: string;
}

HistoricoDeTransacaoBancaria.init({
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
  valor: {
    type: DECIMAL(20, 2),
    allowNull: false,
  },
  data: {
    type: DATE,
    allowNull: false,
  },
  tipo: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'HistoricoDeTransacoesBancarias',
  timestamps: false,
});

Usuario.hasMany(HistoricoDeTransacaoBancaria, { foreignKey: 'usuarioId', as: 'Usuarios' });
HistoricoDeTransacaoBancaria.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'Usuarios' });

export default HistoricoDeTransacaoBancaria;
