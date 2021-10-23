import { useWeb3React } from "@web3-react/core";

const DEFAULT_CHAIN_ID = 137;

export default function useChainId() {
  const { chainId } = useWeb3React();

  return chainId || DEFAULT_CHAIN_ID;
}
