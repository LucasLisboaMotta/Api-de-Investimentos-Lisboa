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
  },
  ativoId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nota: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'RecomendacoesDeAtivos',
  timestamps: false,
});

RecomendacaoDeAtivo.belongsToMany(Gerente, {
  foreignKey: 'gerenteId', as: 'Gerentes', through: RecomendacaoDeAtivo, otherKey: 'ativoId',
});
RecomendacaoDeAtivo.belongsToMany(Ativo, {
  foreignKey: 'ativoId', as: 'Ativos', through: RecomendacaoDeAtivo, otherKey: 'gerenteId',
});

Gerente.hasMany(RecomendacaoDeAtivo, { foreignKey: 'gerenteId', as: 'RecomendacoesDeAtivos' });
Ativo.hasMany(RecomendacaoDeAtivo, { foreignKey: 'ativoId', as: 'RecomendacoesDeAtivos' });

export default RecomendacaoDeAtivo;
