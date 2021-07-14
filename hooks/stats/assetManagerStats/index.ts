import useLoanableAmount from "./useLoanableAmount";
import usePoolBalance from "./usePoolBalance";
import useAssetManagerDAIBalance from "./useAssetManagerDAIBalance";
import useDAIInLendingProtocols from "./useDAIInLendingProtocols";
import useDAIInCompound from "./useDAIInCompound";
import useDAIInAave from "./useDAIInAave";
import useDAIInPureAdapter from "./useDAIInPureAdapter";

export default function useAssetManagerStats() {
  const { data: loanableAmount } = useLoanableAmount();
  const { data: poolBalance } = usePoolBalance();
  const { data: assetManagerDAIBalance } = useAssetManagerDAIBalance();
  const { data: daiInLendingProtocols } = useDAIInLendingProtocols();
  const { data: daiInCompound } = useDAIInCompound();
  const { data: daiInAave } = useDAIInAave();
  const { data: daiInPureAdapter } = useDAIInPureAdapter();

  return {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
    daiInLendingProtocols,
    daiInCompound,
    daiInAave,
    daiInPureAdapter,
  };
}
