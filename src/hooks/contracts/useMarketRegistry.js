import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { MARKET_REGISTRY_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/marketRegistry.json";

export default function useMarketRegistry() {
  const chainId = useChainId();
  return useContract(MARKET_REGISTRY_ADDRESSES[chainId], ABI);
}
