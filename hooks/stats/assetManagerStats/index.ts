import useLoanableAmount from "./useLoanableAmount";
import usePoolBalance from "./usePoolBalance";
import useAssetManagerDAIBalance from "./useAssetManagerDAIBalance";
import useDAIInLendingProtocols from "./useDAIInLendingProtocols";

export default function useAssetManagerStats() {
  const { data: loanableAmount } = useLoanableAmount();
  const { data: poolBalance } = usePoolBalance();
  const { data: assetManagerDAIBalance } = useAssetManagerDAIBalance();
  const { data: daiInLendingProtocols } = useDAIInLendingProtocols();

  return {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
    daiInLendingProtocols,
  };
}
