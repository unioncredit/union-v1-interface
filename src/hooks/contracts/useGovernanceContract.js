import { GOV_ABI, GOV_ADDRESS } from "constants/governance";
import useContract from "../useContract";
import useChainId from "../useChainId";

export default function useGovernanceContract(provider) {
  const chainId = useChainId();

  return useContract(GOV_ADDRESS[chainId], GOV_ABI, provider);
}
