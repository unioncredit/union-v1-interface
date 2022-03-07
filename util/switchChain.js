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
    value: "arbitrum one",
    label: "Arbitrum One",
    buttonVariant: "secondary",
    description:
      "Use Arbitrum’s L2 to manage your credit in a cheaper and faster way",
    imageSrc: "/images/arbitrum.png",
    chainId: 42161,
    networkData: {
      chainId: "0xA4B1",
    },
  },
  {
    value: "kovan",
    label: "Kovan",
    buttonVariant: "secondary",
    description:
      "Use a test version of Ethereum to try out Union and learn more about how it works",
    imageSrc: "/images/kovan.png",
    chainId: 42,
    networkData: {
      chainId: "0x2A",
    },
  },
];

export const switchChain = async (value, provider) => {
  const chainId = value.networkData.chainId;

  const gotToChainSite = () => {
    const url = networkAppUrls[Number(chainId)];
    if (!window.location.href.includes(url)) {
      window.location.href = `${url}${window.location.pathname}`;
    }
  };

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    gotToChainSite();
  } catch (switchError) {
    if (switchError.message === "User rejected the request.") {
      return;
    }

    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [value.networkData],
        });
        gotToChainSite();
      } catch (err) {
        addToast(FLAVORS.ERROR("Error switching chain. Please try again."));
      }
    }
  }
};
