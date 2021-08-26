import useUTokenContract from "hooks/contracts/useUTokenContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getTotalBorrows =
  (uTokenContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalSupply: BigNumber = await uTokenContract.totalBorrows();
    return formatUnits(totalSupply, decimals);
  };

export default function useTotalBorrows() {
  const uTokenContract: Contract = useUTokenContract();
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["totalBorrows", decimals] : null,
    getTotalBorrows(uTokenContract)
  );
}
