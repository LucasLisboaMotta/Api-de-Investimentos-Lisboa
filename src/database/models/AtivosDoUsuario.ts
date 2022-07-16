import { DECIMAL, NUMBER } from 'sequelize';
import { Model, INTEGER } from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Usuario from './Usuario';

class AtivosDoUsuario extends Model {
  usuarioId!: number;
  ativoId!: number;
  quantidade!: number;
  precoDeCompra!: number;
}

AtivosDoUsuario.init({
  usuarioId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ativoId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade: {
    type: NUMBER,
    allowNull: false,
  },
  precoDeCompra: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'AtivosDosUsuarios',
  timestamps: false,
});

Usuario.hasOne(AtivosDoUsuario,  { foreignKey: 'usuarioId', as: 'id' })
Ativo.hasOne(AtivosDoUsuario,  { foreignKey: 'ativoId', as: 'id' })

AtivosDoUsuario.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })
AtivosDoUsuario.belongsTo(Ativo,  { foreignKey: 'ativoId', as: 'id' })

export default AtivosDoUsuario;
