import { SiweMessage } from 'siwe';
import { createConfig } from 'wagmi';
import { getDefaultConfig, SIWEConfig } from 'connectkit';

const siweConfig = createConfig(
  getDefaultConfig({
    alchemyId: import.meta.env.ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.WALLET_CONNECT_PROJECT_ID,
    // Required
    appName: 'Gnosis SIWE demo',
    // Optional
    appDescription: 'Demo Application using SIWE',
    appUrl: 'https://family.co', // app's url
    appIcon:
      'https://cdn.sanity.io/images/r2mka0oi/production/bf37b9c7fb36c7d3c96d3d05b45c76d89072b777-1800x1800.png?w=3840&q=60&auto=format&fit=max', // your app's icon, no bigger than 1024x1024px (max. 1MB) // todo
  })
);

const BASE_URL = import.meta.env.VITE_API_URL;

const siweProviderConfig: SIWEConfig = {
  getNonce: async () => fetch(`${BASE_URL}/nonce`).then((res) => res.text()),
  createMessage: ({ nonce, address, chainId }) =>
    new SiweMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement: 'Sign in With Ethereum.',
    }).prepareMessage(),

  verifyMessage: async ({ message, signature }) =>
    fetch(`${BASE_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include',
    }).then((res) => res.ok),

  getSession: async () =>
    fetch(`${BASE_URL}/session`, { credentials: 'include' }).then((res) =>
      res.ok ? res.json() : null
    ),
  signOut: async () =>
    fetch(`${BASE_URL}/sign_out`, {
      credentials: 'include',
    }).then((res) => res.ok),
};

export { siweConfig, siweProviderConfig };
