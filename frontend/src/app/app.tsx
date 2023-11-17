import { WagmiConfig, createConfig, useAccount } from 'wagmi';
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
  SIWEConfig,
  SIWEProvider,
} from 'connectkit';
import { SiweMessage } from 'siwe';
import ProfileComponent from '../components/profile';
import Layout from '../components/Layout';

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: 'rXSFA7EVveZfQoQhyHDGeZowGuoa8IQN', // or infuraId
    walletConnectProjectId: '1b586c73ff7801bd6daccdf1127b533d',

    // Required
    appName: 'Your App Name',

    // Optional
    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB) // todo
  })
);

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};

const siweConfig: SIWEConfig = {
  getNonce: async () =>
    fetch('http://localhost:3001/api/nonce').then((res) => res.text()),
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
    fetch('http://localhost:3001/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include',
    }).then((res) => res.ok),

  getSession: async () =>
    fetch('http://localhost:3001/api/session', { credentials: 'include' }).then(
      (res) => (res.ok ? res.json() : null)
    ),
  signOut: async () =>
    fetch('http://localhost:3001/api/sign_out', {
      credentials: 'include',
    }).then((res) => res.ok),
};

const App = () => {
  return (
    <WagmiConfig config={config}>
      <SIWEProvider {...siweConfig}>
        <ConnectKitProvider>
          <Layout>
            <ProfileComponent />
          </Layout>
        </ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};

export default App;
