import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import Ativo from './Ativo';
import Gerente from './Gerente';

class RecomendacaoDeAtivo extends Model {
  gerenteId!: number;
  ativoId!: number;
  nota!: number;
}

RecomendacaoDeAtivo.init({
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
  modelName: 'RecomendacoesDeAtivos',
  timestamps: false,
});

Gerente.hasMany(RecomendacaoDeAtivo,  { foreignKey: 'usuarioId', as: 'id' })
Ativo.hasMany(RecomendacaoDeAtivo,  { foreignKey: 'ativoId', as: 'id' })

RecomendacaoDeAtivo.belongsTo(Gerente,  { foreignKey: 'usuarioId', as: 'id' })
RecomendacaoDeAtivo.belongsTo(Ativo,  { foreignKey: 'ativoId', as: 'id' })

export default RecomendacaoDeAtivo;
