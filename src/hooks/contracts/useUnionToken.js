import useChainId from "hooks/useChainId";
import useContract from "hooks/useContract";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";

import UNION_TOKEN_ABI from "constants/abis/unionToken.json";

export default function useUnionToken() {
  const chainId = useChainId();
  return useContract(UNION_TOKEN_ADDRESSES[chainId], UNION_TOKEN_ABI);
}
