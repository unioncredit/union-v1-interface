import U_TOKEN_ABI from "constants/abis/uToken.json";
import { U_TOKEN_ADDRESSES } from "constants/variables";
import useChainId from "hooks/useChainId";
import useContract from "../useContract";

export default function useUnionContract(provider?: any) {
  const chainId = useChainId();

  return useContract(U_TOKEN_ADDRESSES[chainId], U_TOKEN_ABI, provider);
}
