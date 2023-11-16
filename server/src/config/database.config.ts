import { CONFIG } from './index';

const {
  DB_DIALECT,
  DB_NAME,
  DB_PASSWORD,
  DB_HOST,
  DB_USER,
  DB_PORT,
  NODE_ENV,
} = CONFIG;

const config = {};

config[NODE_ENV] = {
  dialect: DB_DIALECT,
  database: DB_NAME,
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  migrationStorageTableName: 'sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_seed',
};

module.exports = config;
