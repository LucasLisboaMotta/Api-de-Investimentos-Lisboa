import 'dotenv/config';
import { Options, Dialect } from 'sequelize';

const dialect = process.env.DB_DIALECT as Dialect;

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect,
};

export = config;
