import {
  UNION_TOKEN_ADDRESSES,
  RESERVOIR_1_ADDRESSES,
} from "constants/variables";
import useChainId from "hooks/useChainId";
import useTokenBalanceOfAccount from "hooks/data/useTokenBalanceOfAccount";

export default function useReservoir1UnionBalance() {
  const chainId = useChainId();

  return useTokenBalanceOfAccount(
    UNION_TOKEN_ADDRESSES[chainId],
    RESERVOIR_1_ADDRESSES[chainId]
  );
}
