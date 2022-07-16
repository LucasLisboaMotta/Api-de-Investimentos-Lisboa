import { Model, INTEGER } from 'sequelize';
import db from '.';
import Gerente from './Gerente';
import Usuario from './Usuario';

class GerenteDeUsuario extends Model {
  usuarioId!: number;
  gerenteId!: number;
}

GerenteDeUsuario.init({
  usuarioId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  gerenteId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'GerenteDeUsuarios',
  timestamps: false,
});

GerenteDeUsuario.belongsToMany(Gerente, {
  foreignKey: 'gerenteId', as: 'Gerentes', through: GerenteDeUsuario, otherKey: 'usuarioId',
});
GerenteDeUsuario.belongsToMany(Usuario, {
  foreignKey: 'usuarioId', as: 'Usuarios', through: GerenteDeUsuario, otherKey: 'gerenteId',
});

Gerente.hasMany(GerenteDeUsuario, { foreignKey: 'gerenteId', as: 'GerenteDeUsuarios' });
Usuario.hasOne(GerenteDeUsuario, { foreignKey: 'usuarioId', as: 'GerenteDeUsuarios' });

export default GerenteDeUsuario;
