import { IronSessionOptions } from 'iron-session';
import { generateNonce, SiweMessage } from 'siwe';
import { ironSession } from 'iron-session/express';
import { CONFIG, ApplicationEnv } from '../config/index'

const sessionOptions: IronSessionOptions = {
  cookieName: CONFIG.COOKIE_NAME,
  password: CONFIG.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: CONFIG.NODE_ENV === ApplicationEnv.PRODUCTION,
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}
export const session = ironSession(sessionOptions);


