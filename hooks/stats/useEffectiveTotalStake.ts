import useTotalStakedDAI from "./useTotalStakedDAI";
import useTotalFrozenStake from "./useTotalFrozenStake";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";

export default function useEffectiveTotalStake() {
  const { data: totalStakedDAI } = useTotalStakedDAI();
  const { data: totalFrozenStake } = useTotalFrozenStake();

  if (totalStakedDAI && totalFrozenStake) {
    const totalStakedDAIBN = FixedNumber.from(totalStakedDAI);
    const totalFrozenStakeBN = FixedNumber.from(totalFrozenStake);
    return totalStakedDAIBN.subUnsafe(totalFrozenStakeBN);
  }

  return undefined;
}
