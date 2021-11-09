import ABI from "constants/abis/marketRegistry.json";
import { MARKET_REGISTRY_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useMarketRegistryContract(provider?: any) {
  const chainId = useChainId();

  return useContract(MARKET_REGISTRY_ADDRESSES[chainId], ABI, provider);
}
