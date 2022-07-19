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
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'ContasDosUsuarios',
  timestamps: false,
});

ContaDoUsuario.belongsTo(Usuario);
Usuario.hasOne(ContaDoUsuario);

export default ContaDoUsuario;
