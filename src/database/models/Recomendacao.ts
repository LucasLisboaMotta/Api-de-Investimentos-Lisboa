import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Gerente from './Gerente';

class Recomendacao extends Model {
  gerenteId!: number;
  ativoId!: number;
  nota!: number;
}

Recomendacao.init({
  gerenteId: {
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
  nota: {
    type: DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Recomendacoes',
  timestamps: false,
});

Gerente.hasMany(Recomendacao,  { foreignKey: 'usuarioId', as: 'id' })
Ativo.hasMany(Recomendacao,  { foreignKey: 'ativoId', as: 'id' })

Recomendacao.belongsTo(Gerente,  { foreignKey: 'usuarioId', as: 'id' })
Recomendacao.belongsTo(Ativo,  { foreignKey: 'ativoId', as: 'id' })

export default Recomendacao;
