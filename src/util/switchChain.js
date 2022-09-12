import { addToast, FLAVORS } from "hooks/useToast";
import { networkAppUrls } from "lib/connectors";

export const options = [
  {
    type: "ethereum",
    id: "ethereum",
    imageSrc: "/images/ethereum.png",
    value: "ethereum",
    label: "Ethereum",
    description:
      "Use Union on Ethereum’s main network. All Governance activity takes place here",
    avatar: "/images/ethereum-avatar.png",
    chainId: 1,
    networkData: {
      chainId: "0x1",
    },
  },
  {
    type: "goerli",
    id: "goerli",
    imageSrc: "/images/gorli.png",
    value: "goerli",
    label: "Goerli",
    description:
      "Use Union on Ethereum’s goerli network. All Governance activity takes place here",
    avatar: "/images/gorli-avatar.png",
    chainId: 5,
    networkData: {
      chainId: "0x5",
    },
  },
  {
    label: "Arbitrum",
    type: "arbitrum",
    id: "arbitrum",
    imageSrc: "/images/arbitrum.png",
    value: "arbitrum one",
    label: "Arbitrum",
    description:
      "Use Arbitrum’s L2 to manage your credit in a cheaper and faster way",
    avatar: "/images/arbitrum-avatar.png",
    chainId: 42161,
    networkData: {
      chainId: "0xA4B1",
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      chainName: "Arbitrum One",
    },
  },
  // {
  //   label: "Arbitrum goerli",
  //   type: "arbitrum goerli",
  //   id: "arbitrum-goerli",
  //   imageSrc: "/images/arbitrum.png",
  //   value: "arbitrum goerli one",
  //   label: "Arbitrum goerli",
  //   description:
  //     "Use Arbitrum’s L2 to manage your credit in a cheaper and faster way",
  //   avatar: "/images/arbitrum-avatar.png",
  //   chainId: 421613,
  //   networkData: {
  //     chainId: "0x66eed",
  //     rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
  //     chainName: "Arbitrum goerli",
  //   },
  // },
  // {
  //   type: "kovan",
  //   id: "kovan",
  //   imageSrc: "/images/kovan.png",
  //   value: "kovan",
  //   label: "Kovan",
  //   description:
  //     "Use a test version of Ethereum to try out Union and learn more about how it works",
  //   avatar: "/images/kovan-avatar.png",
  //   chainId: 42,
  //   networkData: {
  //     chainId: "0x2A",
  //   },
  // },
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
