import { providers } from 'ethers';
import { CONFIG } from './index';
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

const getRpcProvider = (chainId: number) => {
  return new providers.JsonRpcProvider(
    {
      allowGzip: true,
      url: `${getInfuraUrl(chainId)}/${CONFIG.INFURA_ID}`,
    },
    chainId
  );
};

export { getRpcProvider };
