import useUserContract from "hooks/contracts/useUserContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getNewMemberFee =
  (userContract: Contract) => async (_: any, decimals: number) => {
    const newMemberFee: BigNumber = await userContract.newMemberFee();
    return formatUnits(newMemberFee, decimals);
  };

export default function useNewMemberFee() {
  const userContract: Contract = useUserContract();
  const { data: decimals } = useUnionDecimals();
  const shouldFetch = !!userContract;

  return useSWR(
    shouldFetch ? ["newMemberFee", decimals] : null,
    getNewMemberFee(userContract)
  );
}
