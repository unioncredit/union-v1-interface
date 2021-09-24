import { addToast, FLAVORS } from "hooks/useToast";

export const options = [
  {
    value: "kovan",
    label: "Kovan",
    buttonVariant: "ethereum",
    description:
      "Union on mainnet is more frequently used by accounts staking and borrowing larger amounts of DAI.",
    imageSrc: "/images/ethereum.png",
    chainId: 42,
    networkData: {
      chainId: "0x2A",
    },
  },
  {
    value: "polygon",
    label: "Polygon",
    buttonVariant: "polygon",
    description:
      "Faster and cheaper. Used more frequently by accounts transacting with smaller amounts of DAI.",
    imageSrc: "/images/polygon.png",
    chainId: 137,
    networkData: {
      chainId: "0x89",
      rpcUrls: ["https://rpc-mainnet.matic.network"],
      chainName: "Matic(Polygon) Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  },
];

export const switchChain = async (value) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: value.networkData.chainId }],
    });
  } catch (switchError) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [value.networkData],
      });
    } catch (addError) {
      addToast(FLAVORS.ERROR("Error switching chain. Please try again."));
    }
  }
};
