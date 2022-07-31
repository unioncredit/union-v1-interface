import { Avatar } from "@unioncredit/ui";
import { ReactComponent as WalletConnect } from "@unioncredit/ui/lib/icons/walletconnect.svg";
import { ReactComponent as Metamask } from "@unioncredit/ui/lib/icons/metamask.svg";
import { ReactComponent as Coinbase } from "@unioncredit/ui/lib/icons/coinbase.svg";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const POLLING_INTERVAL = 12000;

const INFURA_KEY = "05bc032e727c40d79202e3373090ed55";

export const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  42161: "https://arb1.arbitrum.io/rpc",
  421611: "https://rinkeby.arbitrum.io/rpc",
};

export const networkImages = {
  1: "/images/ethereum.png",
  42: "/images/kovan.png",
  42161: "/images/arbitrum.png",
  421611: "/images/arbitrum.png",
};

const networkAppUrlsDev = {
  1: "http://app.test:3000",
  42: "http://kovan.test:3000",
  42161: "http://arbitrum.test:3000",
  421611: "http://arbitrum-testnet.test:3000",
};

export const networkAppUrlsProd = {
  1: "https://app.union.finance",
  42: "https://kovan.union.finance",
  42161: "https://arbitrum.union.finance",
  421611: "https://arbitrum-testnet.union.finance",
};

export const networkAppUrls =
  process.env.NODE_ENV === "development"
    ? networkAppUrlsDev
    : networkAppUrlsProd;

const allNetworks = {
  1: RPC_URLS[1],
  42: RPC_URLS[42],
  42161: RPC_URLS[42161],
  421611: RPC_URLS[421611],
};

export const networks =
  typeof window === "undefined"
    ? allNetworks
    : (() => {
        const filteredNetworks = Object.keys(allNetworks).reduce((acc, key) => {
          const host = window.location.host;
          const chainId = Object.keys(allNetworks).find((chainId) => {
            return networkAppUrls[chainId]?.includes(host);
          });

          if (chainId && chainId.toString() === key.toString()) {
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

const coinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  appName: "Union",
  supportedChainIds: Object.keys(networks).map(Number),
});

export const network = new NetworkConnector({
  urls: networks,
  defaultChainId: 1,
});

export const CONNECTORS = {
  MetaMask: injected,
  WalletConnect: walletconnect,
  CoinbaseWallet: coinbaseWallet,
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
  CoinbaseWallet: {
    connector: coinbaseWallet,
    name: "CoinbaseWallet",
    color: "#4196FC",
    description: "Connect by scanning a QR code with your coinbase wallet",
    icon: <Avatar size={48} icon={Coinbase} />,
  },
};
