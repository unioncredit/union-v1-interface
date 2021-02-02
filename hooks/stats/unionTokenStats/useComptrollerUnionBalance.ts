import {
  UNION_TOKEN_ADDRESSES,
  COMPTROLLER_ADDRESSES,
} from "constants/variables";
import useChainId from "hooks/useChainId";
import useTokenBalanceOfAccount from "hooks/data/useTokenBalanceOfAccount";

export default function useComptrollerUnionBalance() {
  const chainId = useChainId();

  return useTokenBalanceOfAccount(
    UNION_TOKEN_ADDRESSES[chainId],
    COMPTROLLER_ADDRESSES[chainId]
  );
}
