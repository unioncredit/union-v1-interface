import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useReadProvider from "hooks/useReadProvider";

const getDebtCeiling =
  (uTokenContract: Contract) => async (_: any, decimals: BigNumber) => {
    const debtCeiling: BigNumber = await uTokenContract.debtCeiling();
    return formatUnits(debtCeiling, decimals);
  };

export default function useDebtCeiling() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const { data: decimals } = useDAIDecimals();

  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["debtCeiling", decimals] : null,
    getDebtCeiling(uTokenContract)
  );
}
