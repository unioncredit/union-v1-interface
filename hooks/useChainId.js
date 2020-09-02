import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { newRidgeState } from "react-ridge-state";

const chainIdState = newRidgeState();

export function useChainIdUpdater() {
  const { chainId } = useWeb3React();
  const [, setState] = chainIdState.use();

  useEffect(() => {
    if (chainId) {
      setState(chainId);
    }
  }, [chainId]);
}

export default function useChainId() {
  return chainIdState.useValue();
}
