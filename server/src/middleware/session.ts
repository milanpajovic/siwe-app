import { IronSessionOptions } from 'iron-session';
import { SiweMessage } from 'siwe';
import { ironSession } from 'iron-session/express';
import { CONFIG } from '../config';

const sessionOptions: IronSessionOptions = {
  cookieName: CONFIG.COOKIE_NAME,
  password: CONFIG.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: true,
    sameSite: 'none',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}
export const session = ironSession(sessionOptions);
