import useLoanableAmount from "./useLoanableAmount";
import usePoolBalance from "./usePoolBalance";
import useAssetManagerDAIBalance from "./useAssetManagerDAIBalance";

export default function useAssetManagerStats() {
  const { data: loanableAmount } = useLoanableAmount();
  const { data: poolBalance } = usePoolBalance();
  const { data: assetManagerDAIBalance } = useAssetManagerDAIBalance();

  return {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
  };
}
