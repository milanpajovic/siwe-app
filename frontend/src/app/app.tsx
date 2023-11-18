import { WagmiConfig } from 'wagmi';
import {
  ConnectKitProvider,
  SIWEProvider,
} from 'connectkit';
import Layout from '../components/Layout';
import DashboardPage from '../pages/DashboardPage';
import { siweConfig, siweProviderConfig } from '../app/config/siwe-modal'

const App = () => {
  return (
    <WagmiConfig config={siweConfig}>
      <SIWEProvider {...siweProviderConfig}>
        <ConnectKitProvider>
          <Layout>
            <DashboardPage />
          </Layout>
        </ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};

export default App;
