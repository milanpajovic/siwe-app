import { Sequelize } from 'sequelize-typescript';
import { ApplicationEnv, CONFIG } from '../config';
import Profile from './Profile.model';

const dialectOptions =
  CONFIG.NODE_ENV === ApplicationEnv.PRODUCTION
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

const db = new Sequelize({
  database: CONFIG.DB_NAME,
  host: CONFIG.DB_HOST,
  port: +CONFIG.DB_PORT,
  dialect: CONFIG.DB_DIALECT as never,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  models: [Profile],
  dialectOptions,
  logging: (query) => console.log(query),
});
export default db;
