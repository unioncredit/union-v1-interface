import {
  UNION_TOKEN_ADDRESSES,
  TREASURY_VESTOR_ADDRESSES,
} from "constants/variables";
import useChainId from "hooks/useChainId";
import useTokenBalanceOfAccount from "hooks/data/useTokenBalanceOfAccount";

export default function useReservoir2UnionBalance() {
  const chainId = useChainId();

  return useTokenBalanceOfAccount(
    UNION_TOKEN_ADDRESSES[chainId],
    TREASURY_VESTOR_ADDRESSES[chainId]
  );
}
