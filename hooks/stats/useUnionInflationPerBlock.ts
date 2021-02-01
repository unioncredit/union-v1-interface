import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";
import useComptrollerContract from "hooks/contracts/useComptrollerContract";
import useSWR from "swr";
import useEffectiveTotalStake from "hooks/stats/useEffectiveTotalStake";

const getUnionInflationPerBlock = (comptroller: Contract) => async (
  _: any,
  effectiveTotalStake: FixedNumber
) => {
  return comptroller.inflationPerBlock(
    UNION_TOKEN_ADDRESSES,
    effectiveTotalStake
  );
};

export default function useUnionInflationPerBlock() {
  const comptroller: Contract = useComptrollerContract();
  const effectiveTotalStake: FixedNumber = useEffectiveTotalStake();
  const shouldFetch = !!comptroller && effectiveTotalStake;
  return useSWR(
    shouldFetch ? ["unionInflationPerBlock", effectiveTotalStake] : null,
    getUnionInflationPerBlock(comptroller)
  );
}
