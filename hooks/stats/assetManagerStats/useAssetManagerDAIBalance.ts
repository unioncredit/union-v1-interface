import { ASSET_MANAGER_ADDRESSES, TOKENS } from "constants/variables";
import useChainId from "hooks/useChainId";
import useTokenBalanceOfAccount from "hooks/data/useTokenBalanceOfAccount";

export default function useAssetManagerDAIBalance() {
  const chainId = useChainId();

  return useTokenBalanceOfAccount(
    TOKENS[chainId]?.DAI,
    ASSET_MANAGER_ADDRESSES[chainId]
  );
}
