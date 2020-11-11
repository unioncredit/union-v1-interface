import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/userManager.json";
import { USER_MANAGER_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useUserContract() {
  const { chainId } = useWeb3React();

  return useContract(USER_MANAGER_ADDRESSES[chainId], ABI);
}
