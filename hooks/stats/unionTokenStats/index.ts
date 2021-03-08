import useUnionTokenSupply from "./useUnionTokenSupply";
import useReservoir1UnionBalance from "./useReservoir1UnionBalance";
import useReservoir2UnionBalance from "./useReservoir2UnionBalance";
import useComptrollerUnionBalance from "./useComptrollerUnionBalance";
import useUnionPausedState from "./useUnionPausedState";
import useUnionInflationPerBlock from "./useUnionInflationPerBlock";

export default function useUnionTokenStats() {
  const { data: totalSupply } = useUnionTokenSupply();
  const { data: reservoir1UnionBalance } = useReservoir1UnionBalance();
  const { data: reservoir2UnionBalance } = useReservoir2UnionBalance();
  const { data: comptrollerUnionBalance } = useComptrollerUnionBalance();
  const { data: isUnionTransferPaused } = useUnionPausedState();
  const { data: unionInflationPerBlock } = useUnionInflationPerBlock();

  return {
    totalSupply,
    reservoir1UnionBalance,
    reservoir2UnionBalance,
    comptrollerUnionBalance,
    isUnionTransferPaused,
    unionInflationPerBlock,
  };
}
