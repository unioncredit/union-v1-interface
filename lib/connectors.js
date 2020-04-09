import { InjectedConnector } from "@web3-react/injected-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

//1337 is local
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.FORTMATIC_API_KEY_TEST,
  chainId: 4,
});

export const CONNECTORS = {
  Injected: injected,
  WalletConnect: injected,
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
  },
  MetaMask: {
    connector: injected,
    name: "MetaMask",
    description: "Easy-to-use browser extension.",
    color: "#E8831D",
  },
  Fortmatic: {
    connector: fortmatic,
    name: "Fortmatic",
    description: "",
    color: "#000",
  },
  WalletConnect: {
    connector: injected,
    name: "WalletConnect",
    description: "",
    color: "#000",
  },
};
