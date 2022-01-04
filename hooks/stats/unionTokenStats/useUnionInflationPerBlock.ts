import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUserContract from "hooks/contracts/useUserContract";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const getUnionInflationPerBlock = async (
  _: any,
  decimals: BigNumber,
  comptroller: Contract,
  userContract: Contract
) => {
  const totalStaked: BigNumber = await userContract.totalStaked();
  const totalFrozen: BigNumber = await userContract.totalFrozen();
  const effectiveTotalStake: BigNumber = totalStaked.sub(totalFrozen);

  const a = await comptroller.inflationPerBlock(effectiveTotalStake);

  return formatUnits(a, decimals);
};

export default function useUnionInflationPerBlock() {
  const readProvider = useReadProvider();
  const comptroller: Contract = useComptrollerContract(readProvider);
  const userContract: Contract = useUserContract(readProvider);
  const { data: decimals } = useUnionDecimals();

  const shouldFetch = !!comptroller && !!userContract && !!decimals;

  return useSWR(
    shouldFetch
      ? ["unionInflationPerBlock", decimals, comptroller, userContract]
      : null,
    getUnionInflationPerBlock
  );
}
