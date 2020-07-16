import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/assetManager.json";
import { ASSET_MANAGER_ADDRESSES } from "constants/variables";
import useContract from "./useContract";

export default function useAssetContract() {
  const { chainId } = useWeb3React();

  return useContract(ASSET_MANAGER_ADDRESSES[chainId], ABI);
}
