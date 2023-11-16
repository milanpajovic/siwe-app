import { initTracing } from '../tracing/tracer';
const openTelemetrySDK = initTracing('api-service');
openTelemetrySDK.start();

import express from 'express';
import morgan from 'morgan';
import * as path from 'path';
import db from './models';
import logger from './config/logger';

const app = express();

// Morgan setup
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

const startServer = async () => {
  try {
    await db
      .authenticate({})
      .then(() => console.log('Connection has been established successfully.'))
      .catch((error) =>
        console.log('Unable to connect to the database:', error)
      );
    // Start the Express server
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  } catch (error) {
    console.error(error);
    // todo
    process.exit(1);
  }
};

startServer();
