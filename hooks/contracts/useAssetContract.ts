import ABI from "constants/abis/assetManager.json";
import { ASSET_MANAGER_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useAssetContract(provider?: any) {
  const chainId = useChainId();

  return useContract(ASSET_MANAGER_ADDRESSES[chainId], ABI, provider);
}
