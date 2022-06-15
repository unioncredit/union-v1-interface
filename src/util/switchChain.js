import { addToast, FLAVORS } from "hooks/useToast";
import { networkAppUrls } from "lib/connectors";

export const options = [
  {
    type: "ethereum",
    id: "ethereum",
    imageSrc: "/images/ethereum-avatar.png",
    value: "ethereum",
    label: "Ethereum",
    description:
      "Use Union on Ethereum’s main network. All Governance activity takes place here",
    avatar: "/images/ethereum-avatar.png",
    chainId: 1,
    networkData: {
      chainId: "0x1",
    },
    badges: [
      { label: "Governance", color: "blue" },
      { label: "Higher Gas Fees", color: "yellow" },
    ],
  },
  {
    label: "Arbitrum",
    type: "arbitrum",
    id: "arbitrum",
    imageSrc: "/images/arbitrum-avatar.png",
    value: "arbitrum one",
    label: "Arbitrum One",
    description:
      "Use Arbitrum’s L2 to manage your credit in a cheaper and faster way",
    avatar: "/images/arbitrum-avatar.png",
    chainId: 42161,
    networkData: {
      chainId: "0xA4B1",
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      chainName: "Arbitrum One",
    },
    badges: [{ label: "Low Gas Fees", color: "blue" }],
  },
  {
    type: "kovan",
    id: "kovan",
    imageSrc: "/images/kovan-avatar.png",
    value: "kovan",
    label: "Kovan",
    description:
      "Use a test version of Ethereum to try out Union and learn more about how it works",
    avatar: "/images/kovan-avatar.png",
    chainId: 42,
    networkData: {
      chainId: "0x2A",
    },
    badges: [
      { label: "Testing", color: "grey" },
      { label: "Development", color: "grey" },
    ],
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
