import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const CONNECTORS = {
  Injected: injected,
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
};
