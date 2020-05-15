import ABI from "constants/abis/assetManager.json";
import getContract from "util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";
import { ASSET_MANAGER_ADDRESSES } from "constants/variables";

export default function useAssetContract() {
  const { library, chainId } = useWeb3React();

  return useAutoMemo(() => {
    try {
      return getContract(
        ASSET_MANAGER_ADDRESSES[chainId],
        ABI,
        library.getSigner()
      );
    } catch {
      return null;
    }
  });
}
