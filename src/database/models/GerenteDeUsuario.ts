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
    autoIncrement: true,
  },
  gerenteId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize: db,
  modelName: 'GerenteDeUsuarios',
  timestamps: false,
});

Usuario.hasOne(GerenteDeUsuario,  { foreignKey: 'usuarioId', as: 'id' })
Gerente.hasMany(GerenteDeUsuario,  { foreignKey: 'ativoId', as: 'id' })

GerenteDeUsuario.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })
GerenteDeUsuario.belongsTo(Gerente,  { foreignKey: 'ativoId', as: 'id' })

export default GerenteDeUsuario;
