import { DATE } from 'sequelize';
import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
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
  modelName: 'HistoricoDeTransacoesDeAtivos',
  timestamps: false
});

Usuario.hasMany(HistoricoDeTransacaoBancaria,  { foreignKey: 'usuarioId', as: 'id' })
HistoricoDeTransacaoBancaria.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })
  
export default HistoricoDeTransacaoBancaria;
