import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getUnionBaseInflation = (comptrollerContract: Contract) => async (
  _: any,
  decimals: BigNumber
) => {
  const baseInflation: BigNumber = await comptrollerContract.INIT_INFLATION_RATE();
  return formatUnits(baseInflation, decimals);
};

export default function useUnionBaseInflation() {
  const comptrollerContract: Contract = useComptrollerContract();
  const { data: decimals } = useUnionDecimals();
  const shouldFetch = !!comptrollerContract;
  return useSWR(
    shouldFetch ? ["unionBaseInflation", decimals] : null,
    getUnionBaseInflation(comptrollerContract)
  );
}
