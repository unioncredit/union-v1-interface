import UNION_TOKEN_ABI from "constants/abis/unionToken.json";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useUnionContract(provider?: any) {
  const chainId = useChainId();

  return useContract(UNION_TOKEN_ADDRESSES[chainId], UNION_TOKEN_ABI, provider);
}
