import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";

const getDebtCeiling = (uTokenContract: Contract) => async (
  _: any,
  decimals: BigNumber
) => {
  const debtCeiling: BigNumber = await uTokenContract.debtCeiling();
  return formatUnits(debtCeiling, decimals);
};

export default function useDebtCeiling() {
  const uTokenContract: Contract = useUTokenContract();
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["debtCeiling", decimals] : null,
    getDebtCeiling(uTokenContract)
  );
}
