import { DECIMAL, NUMBER } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Ativo extends Model {
  id!: number;
  sigla!: string;
  nome!: string;
  quantidade!: number;
  valor!: number;
}

Ativo.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sigla: {
    type: STRING(100),
    allowNull: false,
  },
  nome: {
    type: STRING(100),
    allowNull: false,
  },
  quantidade: {
    type: NUMBER,
    allowNull: false,
  },
  valor: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Ativos',
  timestamps: false,
});

export default Ativo;
