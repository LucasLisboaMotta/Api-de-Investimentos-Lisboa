import {
  Model, INTEGER, DECIMAL, NUMBER,
} from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Usuario from './Usuario';

class AtivosDoUsuario extends Model {
  usuarioId!: number;
  ativoId!: number;
  quantidade!: number;
  precoMedioDeCompra!: number;
}

AtivosDoUsuario.init({
  usuarioId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
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
  precoMedioDeCompra: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'AtivosDosUsuarios',
  timestamps: false,
});

AtivosDoUsuario.belongsToMany(Usuario, {
  foreignKey: 'usuarioId', as: 'Usuarios', through: AtivosDoUsuario, otherKey: 'ativoId',
});
AtivosDoUsuario.belongsToMany(Ativo, {
  foreignKey: 'ativoId', as: 'Ativos', through: AtivosDoUsuario, otherKey: 'usuarioId',
});

Usuario.hasMany(AtivosDoUsuario, { foreignKey: 'usuarioId', as: 'AtivosDosUsuarios' });
Ativo.hasMany(AtivosDoUsuario, { foreignKey: 'ativoId', as: 'AtivosDosUsuarios' });

export default AtivosDoUsuario;
