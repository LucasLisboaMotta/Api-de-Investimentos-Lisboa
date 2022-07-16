import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Gerente extends Model {
  id!: number;
  nome!: string;
  sobrenome!: string;
  email!: string;
  senha!: string;
}

Gerente.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: STRING(100),
    allowNull: false,
  },
  sobrenome: {
    type: STRING(100),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    allowNull: false,
  },
  senha: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Gerentes',
  timestamps: false,
});

export default Gerente;
