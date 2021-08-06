import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [4, 42, 137, 80001],
});

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  80001: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
};

// TODO: change wallet connect network and default chain id for polygon
export const walletconnect = new WalletConnectConnector({
  rpc: {
    42: RPC_URLS[42],
    137: RPC_URLS[137],
    80001: RPC_URLS[80001],
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const network = new NetworkConnector({
  urls: {
    42: RPC_URLS[42],
    137: RPC_URLS[137],
    80001: RPC_URLS[80001],
  },
  defaultChainId: 137,
});

export const CONNECTORS = {
  Injected: injected,
  WalletConnect: walletconnect,
};

/**
 * @name SUPPORTED_WALLETS
 * @description Stores the visuals for connected Ethereum wallets
 */
export const SUPPORTED_WALLETS = {
  Injected: {
    connector: injected,
    name: "Wallet",
    color: "#010101",
    icon: null,
  },
  MetaMask: {
    connector: injected,
    name: "MetaMask",
    color: "#E8831D",
    icon: "metamask",
  },
  WalletConnect: {
    connector: walletconnect,
    name: "WalletConnect",
    color: "#4196FC",
    icon: "walletconnect",
  },
};
