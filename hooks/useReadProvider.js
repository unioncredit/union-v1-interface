import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import useChainId from "hooks/useChainId";
import { RPC_URLS } from "lib/connectors";

export default function useReadProvider() {
  const { library } = useWeb3React();
  const chainId = useChainId();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (chainId) {
      setProvider(new JsonRpcProvider(RPC_URLS[chainId]));
    } else if (library) {
      setProvider(library.getSigner().provider);
    }
  }, [chainId, library]);

  return provider;
}
