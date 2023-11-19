import { Sequelize } from 'sequelize-typescript';
import { CONFIG } from '../config';
import Profile from './Profile.model';

const db = new Sequelize({
  database: CONFIG.DB_NAME,
  host: CONFIG.DB_HOST,
  port: +CONFIG.DB_PORT,
  dialect: CONFIG.DB_DIALECT as never, // todo
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  models: [Profile],
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: (query) => console.log(query),
});
export default db;
