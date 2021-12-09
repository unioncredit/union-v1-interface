import useUserContract from "hooks/contracts/useUserContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getTotalFrozenStake =
  (userContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalFrozen: BigNumber = await userContract.totalFrozen();
    return formatUnits(totalFrozen, decimals);
  };

export default function useTotalFrozenStake() {
  const readProvider = useReadProvider();
  const userContract: Contract = useUserContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!userContract && !!decimals;
  return useSWR(
    shouldFetch ? ["totalFrozenStake", decimals] : null,
    getTotalFrozenStake(userContract)
  );
}
