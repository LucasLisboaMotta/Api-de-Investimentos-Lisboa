import { Model, INTEGER } from 'sequelize';
import Ativo from './Ativo';
import Usuario from './Usuario';
import db from '.';

class AtivoFavorito extends Model {
  usuarioId!: number;
  ativoId!: number;
}

AtivoFavorito.init({
  usuarioId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ativoId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'AtivosFavoritos',
  timestamps: false,
});

AtivoFavorito.belongsToMany(Usuario, {
  foreignKey: 'usuarioId', as: 'Usuarios', through: AtivoFavorito, otherKey: 'ativoId',
});
AtivoFavorito.belongsToMany(Ativo, {
  foreignKey: 'ativoId', as: 'Ativos', through: AtivoFavorito, otherKey: 'usuarioId',
});

Usuario.hasMany(AtivoFavorito, { foreignKey: 'usuarioId', as: 'AtivosFavoritos' });
Ativo.hasMany(AtivoFavorito, { foreignKey: 'ativoId', as: 'AtivosFavoritos' });

export default AtivoFavorito;
