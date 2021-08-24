import { Select } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { addToast, FLAVORS } from "hooks/useToast";

const options = [
  {
    value: "ethereum",
    label: "Ethereum",
    imageSrc: "/images/ethereum.png",
    chainId: 1,
    networkData: {
      chainId: "0x1",
    },
  },
  {
    value: "polygon",
    label: "Polygon",
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

export function NetworkSelect() {
  const [loading, setIsLoading] = useState(false);
  const { chainId } = useWeb3React();

  const defaultValueIndex = options.findIndex(
    (option) => option.chainId === chainId
  );

  const handleChangeNetwork = async (value) => {
    try {
      setIsLoading(true);
      await ethereum.request({
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      options={options}
      mb="20px"
      onChange={handleChangeNetwork}
      isLoading={loading}
      defaultValue={!!~defaultValueIndex && options[defaultValueIndex]}
    />
  );
}

