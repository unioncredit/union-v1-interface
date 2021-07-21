import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

export default function useReadProvider() {
  const { chainId, library } = useWeb3React();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (chainId && library) {
      if (chainId == 137) {
        setProvider(
          new JsonRpcProvider(
            `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
          )
        );
      } else if (chainId === 80001) {
        setProvider(
          new JsonRpcProvider(
            `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
          )
        );
      } else {
        setProvider(library.getSigner().provider);
      }
    }
  }, [chainId, library]);

  return provider;
}
