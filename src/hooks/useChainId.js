import { useWeb3React } from "@web3-react/core";

import { networkAppUrls } from "lib/connectors";
import { DEFAULT_CHAIN_ID } from "constants/app";
import { useUnsupportedChains } from "providers/UnsupportedChain";

export default function useChainId() {
  const { chainId } = useWeb3React();
  const chainIds = useUnsupportedChains();

  if (chainId) {
    const unsupported = chainIds?.includes(Number(chainId));
    return unsupported ? DEFAULT_CHAIN_ID : chainId;
  }

  const value = Object.keys(networkAppUrls).reduce((acc, chainId) => {
    if (
      typeof window !== "undefined" &&
      networkAppUrls[chainId]?.includes(window.location.hostname)
    ) {
      return chainId;
    }
    return acc;
  }, null);

  if (!value) return DEFAULT_CHAIN_ID;

  const unsupported = chainIds?.includes(Number(value));
  return unsupported ? DEFAULT_CHAIN_ID : value;
}
