import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

export default function useReadProvider() {
  const { chainId, library } = useWeb3React();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (chainId && library) {
      if (chainId == 137) {
        setProvider(null);
      } else if (chainId === 80001) {
        // TODO: move network info to config
        var networkInfo = {
          url: "https://nd-057-472-350.p2pify.com",
          user: "gifted-bassi",
          password: "aged-comply-bony-chump-dusk-droop",
        };
        setProvider(new JsonRpcProvider(networkInfo));
      } else {
        setProvider(library.getSigner().provider);
      }
    }
  }, [chainId, library]);

  return provider;
}
