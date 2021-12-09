import ABI from "constants/abis/timelock.json";
import { TIMELOCK_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useUserContract(provider?: any) {
  const chainId = useChainId();
  return useContract(TIMELOCK_ADDRESSES[chainId], ABI, provider);
}
