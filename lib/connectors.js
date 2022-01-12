import { Avatar } from "union-ui";
import WalletConnect from "union-ui/lib/icons/walletconnect.svg";
import Metamask from "union-ui/lib/icons/metamask.svg";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;

export const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
};

export const networkImages = {
  1: "/images/ethereum.png",
  42: "/images/kovan.png",
  137: "/images/polygon.png",
};

const networkAppUrlsDev = {
  1: "http://app.test:3000",
  42: "http://kovan.test:3000",
  137: "http://polygon.test:3000",
};

const networkAppUrlsProd = {
  1: "https://app.union.finance",
  42: "https://app.union.finance",
  137: "https://app.union.finance",
};

export const networkAppUrls =
  process.env.NODE_ENV === "development"
    ? networkAppUrlsDev
    : networkAppUrlsProd;

const allNetworks = {
  1: RPC_URLS[1],
  42: RPC_URLS[42],
  137: RPC_URLS[137],
};

export const networks =
  typeof window === "undefined"
    ? allNetworks
    : (() => {
        const filteredNetworks = Object.keys(allNetworks).reduce((acc, key) => {
          const host = window.location.host;
          const chainId = Object.keys(allNetworks).find((chainId) => {
            return networkAppUrls[chainId].includes(host);
          });

          if (
            chainId &&
            (chainId.toString() === "1" ||
              chainId.toString() === key.toString())
          ) {
            return { [key]: allNetworks[key], ...acc };
          }

          return acc;
        }, {});

        return Object.keys(filteredNetworks).length > 0
          ? filteredNetworks
          : allNetworks;
      })();

export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(networks).map(Number),
});

export const walletconnect = new WalletConnectConnector({
  rpc: networks,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const network = new NetworkConnector({
  urls: networks,
  defaultChainId: 137,
});

export const CONNECTORS = {
  MetaMask: injected,
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
    description:
      "Connect using a browser plugin. Best supported on Chrome or Firefox.",
    icon: <Avatar size={48} icon={Metamask} />,
  },
  WalletConnect: {
    connector: walletconnect,
    name: "WalletConnect",
    color: "#4196FC",
    description:
      "Connect by scanning a QR code with any supported mobile wallet, like Rainbow",
    icon: <Avatar size={48} icon={WalletConnect} />,
  },
};
