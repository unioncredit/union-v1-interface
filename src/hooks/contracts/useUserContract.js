import ABI from "constants/abis/userManager.json";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useUserContract(provider) {
  const chainId = useChainId();

  return useContract(USER_MANAGER_ADDRESSES[chainId], ABI, provider);
}
