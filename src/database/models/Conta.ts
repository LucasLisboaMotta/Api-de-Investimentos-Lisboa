import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Usuario from './Usuario';

class Conta extends Model {
  usuarioId!: number;
  saldo!: number;
}

Conta.init({
  usuarioId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  saldo: {
    type: DECIMAL(20, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Contas',
  timestamps: false,
});

Usuario.hasOne(Conta,  { foreignKey: 'usuarioId', as: 'id' })
Conta.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })

export default Conta;
