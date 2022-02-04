import { useWeb3React } from "@web3-react/core";
import { DEFAULT_CHAIN_ID } from "constants/app";
import { useUnsupportedChains } from "providers/UnsupportedChain";

export default function useChainId() {
  const { chainId } = useWeb3React();
  const chainIds = useUnsupportedChains();

  const unsupported = chainIds.includes(chainId);

  return !unsupported ? chainId || DEFAULT_CHAIN_ID : DEFAULT_CHAIN_ID;
}
