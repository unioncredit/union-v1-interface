import useUserContract from "hooks/contracts/useUserContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getTotalFrozenStake =
  (userContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalFrozen: BigNumber = await userContract.totalFrozen();
    return formatUnits(totalFrozen, decimals);
  };

export default function useTotalFrozenStake() {
  const userContract: Contract = useUserContract();
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!useUserContract;
  return useSWR(
    shouldFetch ? ["totalFrozenStake", decimals] : null,
    getTotalFrozenStake(userContract)
  );
}
