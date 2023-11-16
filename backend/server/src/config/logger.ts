import * as winston from 'winston';
import { ApplicationEnv } from './index';

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize({
      colors: {
        info: 'cyan',
        debug: 'blue',
        error: 'red',
        warn: 'yellow',
      },
    }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${info.context}] ${info.message}`;
    })
  ),
});

const cloudTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${info.context}] ${info.message}`;
    })
  ),
});

const logger = winston.createLogger({
  level: 'info', // Default logging level
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    process.env.NODE_ENV === ApplicationEnv.DEVELOPMENT
      ? consoleTransport
      : cloudTransport,
  ],
});

export default logger;
