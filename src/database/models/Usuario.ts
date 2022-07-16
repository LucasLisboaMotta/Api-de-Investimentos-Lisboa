import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Usuario extends Model {
  id!: number;
  nome!: string;
  sobrenome!: string;
  email!: string;
  senha!: string;
}

Usuario.init({
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
  modelName: 'Usuarios',
  timestamps: false,
});

export default Usuario;
