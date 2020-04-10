import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import Fortmatic from "../svgs/Fortmatic";
import MetaMask from "../svgs/MetaMask";
import WalletConnect from "../svgs/WalletConnect";

//1337 is local
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.FORTMATIC_API_KEY_TEST,
  chainId: 4,
});

/**
 * @todo Actually hook up WalletConnect here
 */
export const walletconnect = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
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
