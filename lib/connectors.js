import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import Fortmatic from "../svgs/Fortmatic";
import MetaMask from "../svgs/MetaMask";
import WalletConnect from "../svgs/WalletConnect";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

/**
 * @note chainId 1337 is localhost
 */
export const injected = new InjectedConnector({
  supportedChainIds: [42, 1337],
});

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.FORTMATIC_API_KEY,
  chainId: 42,
});

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`,
};

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const CONNECTORS = {
  Injected: injected,
  WalletConnect: walletconnect,
  Fortmatic: fortmatic,
};

/**
 * @name SUPPORTED_WALLETS
 * @description Stores the visuals for connected Ethereum wallets
 */
export const SUPPORTED_WALLETS = {
  Injected: {
    connector: injected,
    name: "Injected",
    description: "Injected web3 provider.",
    color: "#010101",
    icon: null,
  },
  MetaMask: {
    connector: injected,
    name: "MetaMask",
    description: "Easy-to-use browser extension.",
    color: "#E8831D",
    icon: <MetaMask />,
  },
  Fortmatic: {
    connector: fortmatic,
    name: "Fortmatic",
    description: "",
    color: "#000",
    icon: <Fortmatic />,
  },
  WalletConnect: {
    connector: walletconnect,
    name: "WalletConnect",
    description: "",
    color: "#000",
    icon: <WalletConnect />,
  },
};
