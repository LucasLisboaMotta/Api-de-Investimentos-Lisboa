import { Model, INTEGER } from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Usuario from './Usuario';

class AtivoFavorito extends Model {
  usuarioId!: number;
  ativoId!: number;
}

AtivoFavorito.init({
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
}, {
  sequelize: db,
  modelName: 'AtivosFavoritos',
  timestamps: false,
});

Usuario.hasMany(AtivoFavorito,  { foreignKey: 'usuarioId', as: 'id' })
Ativo.hasMany(AtivoFavorito,  { foreignKey: 'ativoId', as: 'id' })

AtivoFavorito.belongsTo(Usuario,  { foreignKey: 'usuarioId', as: 'id' })
AtivoFavorito.belongsTo(Ativo,  { foreignKey: 'ativoId', as: 'id' })

export default AtivoFavorito;
