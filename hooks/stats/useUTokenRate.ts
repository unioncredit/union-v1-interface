import useUTokenContract from "hooks/contracts/useUTokenContract";
import useUTokenDecimals from "hooks/useUTokenDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getUTokenRate = (uTokenContract: Contract) => async (
  _: any,
  decimals: BigNumber
) => {
  const totalSupply: BigNumber = await uTokenContract.totalBorrows();
  return formatUnits(totalSupply, decimals);
};

export default function useUTokenRate() {
  const uTokenContract: Contract = useUTokenContract();
  const { data: decimals } = useUTokenDecimals();
  const shouldFetch = !!uTokenContract;
  return useSWR(
    shouldFetch ? ["uTokenRate", decimals] : null,
    getUTokenRate(uTokenContract)
  );
}
