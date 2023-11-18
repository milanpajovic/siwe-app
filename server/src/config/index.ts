import * as dotenv from 'dotenv';
dotenv.config();

export enum ApplicationEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  TEST = 'test',
}

const {
  NODE_PORT,
  NODE_HOST,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  SESSION_SECRET,
  UI_ORIGIN,
  INFURA_ID,
  SECRET_COOKIE_PASSWORD,
  COOKIE_NAME,
} = process.env;

const ENV: ApplicationEnv =
  (NODE_ENV as ApplicationEnv) || ApplicationEnv.DEVELOPMENT;

export const CONFIG = {
  NODE_PORT,
  NODE_HOST,
  NODE_ENV: ENV,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  SESSION_SECRET,
  UI_ORIGIN,
  INFURA_ID,
  SECRET_COOKIE_PASSWORD,
  COOKIE_NAME,
};
