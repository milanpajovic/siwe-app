import { initTracing } from '../tracing/tracer';
const openTelemetrySDK = initTracing('api-service');
openTelemetrySDK.start();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'iron-session';
import helmet from 'helmet';
import * as path from 'path';
import { providers } from 'ethers';
// import db from './models';
import logger from './config/logger';
import { CONFIG } from './config/index';
import { generateNonce, SiweMessage } from 'siwe';
import profileRoute from './routes/profile.router';
import authRoute from './routes/auth.router';
import { session } from './middleware/session';
import { requireAuth } from './middleware/auth.middleware';

const app = express();


// Helmet setup
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CONFIG.UI_ORIGIN,
    credentials: true,
  })
);

// Morgan setup
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(session);

// Use your routes here
app.use('/api/auth', authRoute);
app.use('/api/profile', requireAuth, profileRoute);

const startServer = async () => {
  try {
    // await db
    //   .authenticate({})
    //   .then(() => console.log('Connection has been established successfully.'))
    //   .catch((error) =>
    //     console.log('Unable to connect to the database:', error)
    //   );
    // Start the Express server
    const port = CONFIG.NODE_PORT || 3001;
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


