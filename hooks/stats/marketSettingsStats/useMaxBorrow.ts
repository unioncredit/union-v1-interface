import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useReadProvider from "hooks/useReadProvider";

const getMaxBorrow =
  (uTokenContract: Contract) => async (_: any, decimals: BigNumber) => {
    const maxBorrow: BigNumber = await uTokenContract.maxBorrow();
    return formatUnits(maxBorrow, decimals);
  };

export default function useMaxBorrow() {
  const readProvider = useReadProvider();
  const uTokenContract: Contract = useUTokenContract(readProvider);
  const { data: decimals } = useDAIDecimals();

  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["maxBorrow", decimals] : null,
    getMaxBorrow(uTokenContract)
  );
}
