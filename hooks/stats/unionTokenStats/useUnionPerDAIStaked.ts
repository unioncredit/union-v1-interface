import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUserContract from "hooks/contracts/useUserContract";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";

const offsetPower = 18;
const offset = BigNumber.from(10).pow(offsetPower);

const getUnionPerDAIStaked = async (
  _: any,
  comptroller: Contract,
  userContract: Contract
) => {
  const totalStaked: BigNumber = await userContract.totalStaked();
  const totalFrozen: BigNumber = await userContract.totalFrozen();
  const effectiveTotalStake: BigNumber = totalStaked.sub(totalFrozen);
  const ipb = await comptroller.inflationPerBlock(effectiveTotalStake);

  return formatUnits(ipb.mul(offset).div(effectiveTotalStake), offsetPower);
};

export default function useUnionPerDAIStaked() {
  const readProvider = useReadProvider();
  const comptroller: Contract = useComptrollerContract(readProvider);
  const userContract: Contract = useUserContract(readProvider);

  const shouldFetch = !!comptroller && !!userContract;
  return useSWR(
    shouldFetch ? ["unionPerDAIStaked", comptroller, userContract] : null,
    getUnionPerDAIStaked
  );
}
