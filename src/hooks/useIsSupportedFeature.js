import { useWeb3React } from "@web3-react/core";

import useChainId from "hooks/useChainId";
import { useUnsupportedChains } from "providers/UnsupportedChain";

export default function useIsSupportedFeature() {
  const chainId = useChainId();
  const chainIds = useUnsupportedChains();
  const { chainId: actualChainId } = useWeb3React();

  const unsupported = chainIds?.includes(Number(actualChainId || chainId));

  return !unsupported;
}
