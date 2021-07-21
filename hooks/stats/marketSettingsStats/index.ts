import useInterestRate from "./useInterestRate";
import useOriginationFee from "./useOriginationFee";
import useOverdueBlocks from "./useOverdueBlocks";
import useReserveFactor from "./useReserveFactor";
import useNewMemberFee from "./useNewMemberFee";
import useMaxBorrow from "./useMaxBorrow";
import useMinBorrow from "./useMinBorrow";
import useDebtCeiling from "./useDebtCeiling";

export default function useMarketSettingsStats() {
  const { data: interestRate } = useInterestRate();
  const { data: originationFee } = useOriginationFee();
  const { data: overdueBlocks } = useOverdueBlocks();
  const { data: reserveFactor } = useReserveFactor();
  const { data: newMemberFee } = useNewMemberFee();
  const { data: maxBorrow } = useMaxBorrow();
  const { data: minBorrow } = useMinBorrow();
  const { data: debtCeiling } = useDebtCeiling();

  return {
    interestRate,
    originationFee,
    overdueBlocks,
    reserveFactor,
    newMemberFee,
    maxBorrow,
    minBorrow,
    debtCeiling,
  };
}
