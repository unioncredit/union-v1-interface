import useUnionTokenSupply from "./useUnionTokenSupply";
import useReservoirUnionBalance from "./useReservoirUnionBalance";
import useComptrollerUnionBalance from "./useComptrollerUnionBalance";
import useUnionPausedState from "./useUnionPausedState";
import useUnionInflationPerBlock from "./useUnionInflationPerBlock";
import useUnionBaseInflation from "./useUnionBaseInflation";

export default function useUnionTokenStats() {
  const { data: totalSupply } = useUnionTokenSupply();
  const { data: reservoirUnionBalance } = useReservoirUnionBalance();
  const { data: comptrollerUnionBalance } = useComptrollerUnionBalance();
  const { data: isUnionTransferPaused } = useUnionPausedState();
  const { data: unionInflationPerBlock } = useUnionInflationPerBlock();
  const { data: unionBaseInflation } = useUnionBaseInflation();

  return {
    totalSupply,
    reservoirUnionBalance,
    comptrollerUnionBalance,
    isUnionTransferPaused,
    unionInflationPerBlock,
    unionBaseInflation,
  };
}
