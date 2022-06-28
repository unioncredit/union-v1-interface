import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { COMPTROLLER_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/comptroller.json";

export default function useComptroller() {
  const chainId = useChainId();
  return useContract(COMPTROLLER_ADDRESSES[chainId], ABI);
}
