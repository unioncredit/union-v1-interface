import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { UNION_LENS_ADDRESSES } from "constants/variables";

import ABI from "constants/abis/unionLens.json";

export default function useUnionLens() {
  const chainId = useChainId();
  return useContract(UNION_LENS_ADDRESSES[chainId], ABI);
}
