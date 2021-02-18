import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import useUserManagerStats from "hooks/stats/userManagerStats";
import useUTokenStats from "hooks/stats/uTokenStats";
import { formatDetailed } from "util/formatValue";

export default function UserManagerStatsView() {
  const {
    totalStakedDAI,
    totalFrozenStake,
    effectiveTotalStake,
  } = useUserManagerStats();

  const { defaultedAmount } = useUTokenStats();

  return (
    <Fragment>
      <section className="mb-8">
        <div className="container">
          <StatsHeader />
          <StatsNavigation />
        </div>
      </section>

      <section className="mb-8">
        <div className="container">
          <div className="divider" />
        </div>
      </section>

      <section className="mb-8">
        <div className="container">
          <StatsGrid>
            <StatsCard
              label="Total Stake"
              value={
                totalStakedDAI ? formatDetailed(totalStakedDAI) + " DAI" : "NaN"
              }
            />
            <StatsCard
              label="Effective Total Stake"
              value={
                effectiveTotalStake
                  ? formatDetailed(effectiveTotalStake) + " DAI"
                  : "NaN"
              }
            />
            <StatsCard
              label="Defaulted Stake"
              value={
                defaultedAmount
                  ? formatDetailed(defaultedAmount) + " DAI"
                  : "NaN"
              }
            />
            <StatsCard
              label="Total Frozen Stake"
              value={
                totalFrozenStake
                  ? formatDetailed(totalFrozenStake) + " DAI"
                  : "NaN"
              }
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
