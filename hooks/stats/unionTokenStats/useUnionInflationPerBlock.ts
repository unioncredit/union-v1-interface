import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useUserContract from "hooks/contracts/useUserContract";
import useChainId from "hooks/useChainId";
import useUnionDecimals from "hooks/useUnionDecimals";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";

const getUnionInflationPerBlock = (
  comptroller: Contract,
  userContract: Contract
) => async (_: any, chainId: number, decimals: BigNumber) => {
  const totalStaked: BigNumber = await userContract.totalStaked();
  const totalFrozen: BigNumber = await userContract.totalFrozen();
  const effectiveTotalStake: BigNumber = totalStaked.sub(totalFrozen);

  const a = await comptroller.inflationPerBlock(
    UNION_TOKEN_ADDRESSES[chainId],
    effectiveTotalStake
  );

  return formatUnits(a, decimals);
};

export default function useUnionInflationPerBlock() {
  const comptroller: Contract = useComptrollerContract();
  const userContract: Contract = useUserContract();
  const chainId: number = useChainId();
  const { data: decimals } = useUnionDecimals();

  const shouldFetch =
    !!comptroller && !!userContract && !!chainId && !!decimals;
  return useSWR(
    shouldFetch ? ["unionInflationPerBlock", chainId, decimals] : null,
    getUnionInflationPerBlock(comptroller, userContract)
  );
}
