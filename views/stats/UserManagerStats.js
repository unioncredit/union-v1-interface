import { Stat, Grid } from "@unioncredit/ui";
import { formatEther } from "ethers/lib/utils";

import useUserManagerStats from "hooks/stats/userManagerStats";
import { daiValue } from "./values";

function useUserManagerStatsView() {
  const {
    maxStakeAmount,
    totalStakedDAI,
    totalFrozenStake,
    effectiveTotalStake,
  } = useUserManagerStats();

  return [
    { label: "Total Staked DAI", value: daiValue(totalStakedDAI) },
    { label: "Effective Total Stakes", value: daiValue(effectiveTotalStake) },
    { label: "Total Frozen Stake", value: daiValue(totalFrozenStake) },
    { label: "Max Stake Amount", value: daiValue(formatEther(maxStakeAmount)) },
  ];
}

export default function UserManagerStats() {
  const stats = useUserManagerStatsView();

  return (
    <>
      {stats.map((stat) => (
        <Grid.Col xs={6} md={3} key={stat.label}>
          <Stat
            align="center"
            mb="28px"
            label={stat.label}
            value={stat.value}
          />
        </Grid.Col>
      ))}
    </>
  );
}
