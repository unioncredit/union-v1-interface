import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { ASSET_MANAGER_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/assetManager.json";

export default function useAssetManager() {
  const chainId = useChainId();
  return useContract(ASSET_MANAGER_ADDRESSES[chainId], ABI);
}
