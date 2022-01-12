import { addToast, FLAVORS } from "hooks/useToast";
import { networkAppUrls } from "lib/connectors";

export const options = [
  {
    value: "ethereum",
    label: "Ethereum",
    buttonVariant: "ethereum",
    description:
      "Union on mainnet is more frequently used by accounts staking and borrowing larger amounts of DAI.",
    imageSrc: "/images/ethereum.png",
    chainId: 1,
    networkData: {
      chainId: "0x1",
    },
  },
  {
    value: "kovan",
    label: "Kovan",
    buttonVariant: "secondary",
    description:
      "Union on mainnet is more frequently used by accounts staking and borrowing larger amounts of DAI.",
    imageSrc: "/images/kovan.png",
    chainId: 42,
    networkData: {
      chainId: "0x2A",
    },
  },
];

export const switchChain = async (value) => {
  const chainId = value.networkData.chainId;

  const gotToChainSite = () => {
    const url = networkAppUrls[Number(chainId)];
    if (!window.location.href.includes(url)) {
      window.location.href = url;
    }
  };

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    gotToChainSite();
  } catch (switchError) {
    if (switchError.message === "User rejected the request.") {
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [value.networkData],
      });
      gotToChainSite();
    } catch (addError) {
      addToast(FLAVORS.ERROR("Error switching chain. Please try again."));
    }
  }
};
