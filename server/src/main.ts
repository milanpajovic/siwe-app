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
import { ironSession } from 'iron-session/express';
const app = express();

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}

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

//
const session = ironSession({
  cookieName: 'iron-session/examples/express',
  password: 'dyTtTgMg6pkzzNxqGMXpPqmXV6W9WahF', //process.env.SECRET_COOKIE_PASSWORD, //todo
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // todo Check this
  },
});
app.use(session);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.get('/api/nonce', async (req, res) => {
  req.session.nonce = generateNonce();
  await req.session.save();
  res.status(200).send(req.session.nonce);
});

app.get('/api/me', async (req, res) => {
  res.send({ address: req.session.siwe?.address });
});

app.get('/api/personal_information', async (req, res) => {
  if (!req.session.siwe) {
    return res.status(401).json({ message: 'You have to  Sign in' });
  }
  res.send({ address: req.session.siwe?.address });
});
// todo Add Types
app.get('/api/session', async (req, res) => {
  if (!req.session.siwe) {
    return res.send({ ok: false });
  }

  res.send({
    address: req.session.siwe?.address,
    chainId: req.session.siwe?.chainId,
  });
});
app.post('/api/verify', async (req, res) => {
  const { message, signature } = req.body;

  const siweMessage = new SiweMessage(message);
  const infuraProvider = new providers.JsonRpcProvider(
    {
      allowGzip: true,
      url: `${getInfuraUrl(
        siweMessage.chainId
      )}/8fcacee838e04f31b6ec145eb98879c8`, // todo UpdateIt
      headers: {
        Accept: '*/*',
        Origin: `http://localhost:${3000}`, // todo Update it
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
      },
    },
    siweMessage.chainId
  );
  const fields = await siweMessage.verify(
    { signature },
    { provider: infuraProvider }
  );

  // if (fields.data.nonce !== req.session.nonce)
  //   return res.status(422).json({ message: 'Invalid nonce.' });

  req.session.siwe = fields.data;
  await req.session.save();
  res.json({ ok: true });
});

app.get('/api/profile', async (req, res) => {
  // if (!req.session.siwe) {
  //   return res.send({ ok: null });
  // }
  const profile = {
    name: 'Example Username',
    profile: {
      location: '1234 Example Street, Example City, EX 12345',
      contactPhone: '+1-234-567-8901',
      email: 'contact@example.com',
    },
  };

  // const walletAddress = req.query.address;
  // todo Build it
  res.send(profile);
});

app.put('/api/profile', async (req, res) => {
  // if (!req.session.siwe) {
  //   return res.send({ ok: null });
  // }
  console.log(req.body);
  const profile = {
    name: 'Example Username',
    profile: {
      location: '1234 Example Street, Example City, EX 12345',
      contactPhone: '+1-234-567-8901',
      email: 'contact@example.com',
    },
  };

  // const walletAddress = req.query.address;
  // todo Build it
  res.send(profile);
});
app.get('/api/sign_out', async (req, res) => {
  await req.session.destroy();
  return res.json({ ok: true });
});

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

const getInfuraUrl = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'https://mainnet.infura.io/v3';
    case 3:
      return 'https://ropsten.infura.io/v3';
    case 4:
      return 'https://rinkeby.infura.io/v3';
    case 5:
      return 'https://goerli.infura.io/v3';
    case 137:
      return 'https://polygon-mainnet.infura.io/v3';
  }
};
