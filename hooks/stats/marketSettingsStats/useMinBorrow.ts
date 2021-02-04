import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useUTokenContract from "hooks/contracts/useUTokenContract";

const getMinBorrow = (uTokenContract: Contract) => async (
  _: any,
  decimals: BigNumber
) => {
  const minBorrow: BigNumber = await uTokenContract.minBorrow();
  return formatUnits(minBorrow, decimals);
};

export default function useMinBorrow() {
  const uTokenContract: Contract = useUTokenContract();
  const { data: decimals } = useDAIDecimals();

  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["minBorrow", decimals] : null,
    getMinBorrow(uTokenContract)
  );
}