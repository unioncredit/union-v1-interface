import useContract from "hooks/useContract";
import useChainId from "hooks/useChainId";
import { GOV_ABI, GOV_ADDRESS } from "constants/governance";

export default function useGovernance() {
  const chainId = useChainId();
  return useContract(GOV_ADDRESS[chainId], GOV_ABI);
}
