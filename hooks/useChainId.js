import { useWeb3React } from "@web3-react/core";
import { DEFAULT_CHAIN_ID } from "constants/app";
import { useUnsupportedChains } from "providers/UnsupportedChain";
import { networkAppUrls } from "lib/connectors";

export default function useChainId() {
  const { chainId } = useWeb3React();
  const chainIds = useUnsupportedChains();

  const unsupported = chainIds?.includes(chainId);

  if (chainId) {
    // connected
    return !unsupported ? chainId : DEFAULT_CHAIN_ID;
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

  return value || DEFAULT_CHAIN_ID;
}
