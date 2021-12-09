import useUserContract from "hooks/contracts/useUserContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getTotalStakedDAI =
  (userContract: Contract) => async (_: any, decimals: BigNumber) => {
    const totalStaked: BigNumber = await userContract.totalStaked();
    return formatUnits(totalStaked, decimals);
  };

export default function useTotalStakedDAI() {
  const readProvider = useReadProvider();
  const userContract: Contract = useUserContract(readProvider);
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!userContract && !!decimals;
  return useSWR(
    shouldFetch ? ["totalStakedDAI", decimals] : null,
    getTotalStakedDAI(userContract)
  );
}
