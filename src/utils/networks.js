const NETWORKS = {
  ethereum: {
    name: 'Ethereum Mainnet ',
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'ETH',
    gasUnit: 'Gwei',
    explorer: 'https://etherscan.io'
  },
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'ETH',
    gasUnit: 'Gwei',
    explorer: 'https://arbiscan.io'
  },
    optimism: {
    name: 'Optimism',
    chainId: 10,
    rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'ETH',
    gasUnit: 'Gwei',
    explorer: 'https://optimistic.etherscan.io'
  },
    base: {
    name: 'Base',
    chainId: 8453,
    rpcUrl: 'https://base-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'ETH',
    gasUnit: 'Gwei',
    explorer: 'https://basescan.org'
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://polygonzkevm-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'MATIC',
    gasUnit: 'Gwei',
    explorer: 'https://polygonscan.com'
  },
  superSeed: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://superseed-mainnet.alchemy-blast.com/v2/:apiKey',
    nativeCurrency: 'MATIC',
    gasUnit: 'Gwei',
    explorer: 'https://polygonscan.com'
  },
  Lens: {
    name: 'Lens-Mainnet',
    chainId: 137,
    rpcUrl: 'https://lens-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'MATIC',
    gasUnit: 'Gwei',
    explorer: 'https://polygonscan.com'
  },
  ZkSync: {
    name: 'zksync-mainnet',
    chainId: 324,
    rpcUrl: 'https://zksync-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'MATIC',
    gasUnit: 'Gwei',
    explorer: 'https://polygonscan.com'
  },
  Shape: {
    name: 'shape-mainnet',
    chainId: 324,
    rpcUrl: 'https://shape-mainnet.g.alchemy.com/v2/',
    nativeCurrency: 'MATIC',
    gasUnit: 'Gwei',
    explorer: 'https://polygonscan.com'
  },
  bsc: {
    name: 'Binance Smart Chain',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    nativeCurrency: 'BNB',
    gasUnit: 'Gwei',
    explorer: 'https://bscscan.com'
  }
};

// this function is for Cli to Decide to Navigation for user thorug the Arrow Keys

const getNetworkChoices = () =>{
     return Object.keys(NETWORKS).map(key => ({
          name: NETWORKS[key].name,
          value: key
     }
));
}
// this function ask for the key and retuns it networks value in CLI

const getNetworkConfig = (networkKey)=> {
     return NETWORKS[networkKey];
}

module.exports = {
     NETWORKS,
     getNetworkChoices,
     getNetworkConfig
};
