import { useWeb3React } from "@web3-react/core";
import { GOV_ABI, GOV_ADDRESS } from "constants/governance";
import useContract from "./useContract";

export default function useGovernanceContract() {
  const { chainId } = useWeb3React();

  return useContract(GOV_ADDRESS[chainId], GOV_ABI);
}
