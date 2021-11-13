import { useWeb3React } from "@web3-react/core";
import { DEFAULT_CHAIN_ID } from "constants/app";

export default function useChainId() {
  const { chainId } = useWeb3React();

  return chainId || DEFAULT_CHAIN_ID;
}
