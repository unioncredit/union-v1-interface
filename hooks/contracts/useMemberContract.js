import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/memberManager.json";
import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useMemberContract() {
  const { chainId } = useWeb3React();

  return useContract(MEMBER_MANAGER_ADDRESSES[chainId], ABI);
}
