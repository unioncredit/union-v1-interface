import useTotalStakedDAI from "./useTotalStakedDAI";
import useTotalFrozenStake from "./useTotalFrozenStake";
import useEffectiveTotalStake from "./useEffectiveTotalStake";

export default function useUserManagerStats() {
  const { data: totalStakedDAI } = useTotalStakedDAI();
  const { data: totalFrozenStake } = useTotalFrozenStake();
  const effectiveTotalStake = useEffectiveTotalStake();

  return {
    totalStakedDAI,
    totalFrozenStake,
    effectiveTotalStake,
  };
}
