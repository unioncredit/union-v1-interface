import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import MetaMask from "../svgs/MetaMask";
import WalletConnect from "../svgs/WalletConnect";

export const injected = new InjectedConnector({
  supportedChainIds: [4, 42, 137, 80001],
});

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  137: `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATICVIGIL_ID}`,
  80001: `https://rpc-mumbai.maticvigil.com/v1/${process.env.MATICVIGIL_ID}`,
};

// TODO: change wallet connect network and default chain id for polygon
export const walletconnect = new WalletConnectConnector({
  rpc: {
    42: RPC_URLS[42],
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
  defaultChainId: 42,
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
    icon: <MetaMask />,
  },
  WalletConnect: {
    connector: walletconnect,
    name: "WalletConnect",
    color: "#4196FC",
    icon: <WalletConnect />,
  },
};
