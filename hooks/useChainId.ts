import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { newRidgeState } from "react-ridge-state";

const globalChainIdState = newRidgeState<number>(null);

/**
 * @name useChainIdUpdater
 * @description Used to update the context-less global ridge-state variable any time the web3-react 'chainId' changes
 */
export function useChainIdUpdater() {
  const { chainId } = useWeb3React();
  const [, setState] = globalChainIdState.use();

  useEffect(() => {
    if (chainId) {
      setState(chainId);
    }
  }, [chainId]);
}

/**
 * @name useChainId
 * @description Used to access the web3-react 'chainId' variable outside of the Web3Provider context
 */
export default function useChainId() {
  return globalChainIdState.useValue();
}
