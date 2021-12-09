import ABI from "constants/abis/iMoneyMarketAdapter.json";
import { AAVE_ADAPTER_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useAssetContract(provider?: any) {
  const chainId = useChainId();

  return useContract(AAVE_ADAPTER_ADDRESSES[chainId], ABI, provider);
}
