import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { TIMELOCK_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/timelock.json";

export default function useTimelock(provider) {
  const chainId = useChainId();
  return useContract(TIMELOCK_ADDRESSES[chainId], ABI, provider);
}
