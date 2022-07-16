import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Usuario from './Usuario';

class ContaDoUsuario extends Model {
  usuarioId!: number;
  saldo!: number;
}

ContaDoUsuario.init({
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
  modelName: 'ContasDosUsuarios',
  timestamps: false,
});

Usuario.hasOne(ContaDoUsuario,  { foreignKey: 'usuarioId', as: 'id' })
ContaDoUsuario.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })

export default ContaDoUsuario;
