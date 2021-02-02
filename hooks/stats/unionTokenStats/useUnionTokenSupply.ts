import useUnionContract from "hooks/contracts/useUnionContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getUnionTokenSupply = (unionContract: Contract) => async (
  _: any,
  decimals: BigNumber
) => {
  const totalSupply: BigNumber = await unionContract.totalSupply();
  return formatUnits(totalSupply, decimals);
};

export default function useUnionTokenSupply() {
  const unionContract: Contract = useUnionContract();
  const { data: decimals } = useUnionDecimals();
  const shouldFetch = !!unionContract;
  return useSWR(
    shouldFetch ? ["unionTokenSupply", decimals] : null,
    getUnionTokenSupply(unionContract)
  );
}
