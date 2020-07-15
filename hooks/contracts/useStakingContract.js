import { useWeb3React } from "@web3-react/core";
import ABI from "constants/abis/stakingManager.json";
import { STAKING_MANAGER_ADDRESSES } from "constants/variables";
import useContract from "../useContract";

export default function useStakingContract() {
  const { chainId } = useWeb3React();

  return useContract(STAKING_MANAGER_ADDRESSES[chainId], ABI);
}
