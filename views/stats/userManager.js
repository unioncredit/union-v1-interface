import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useUserManagerStats from "hooks/stats/userManagerStats";
import format from "util/formatValue";

export default function UserManagerStatsView() {
  const {
    totalStakedDAI,
    totalFrozenStake,
    effectiveTotalStake,
  } = useUserManagerStats();

  return (
    <Fragment>
      <section className="mb-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl">Union Stats</h1>
          </div>

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
              label="Total Staked DAI"
              value={format(totalStakedDAI)}
            />
            <StatsCard
              label="Effective Total Stake"
              value={format(effectiveTotalStake)}
            />
            <StatsCard label="Total Locked Stake" value="TBD" />
            <StatsCard label="Defaulted Stake" value="TBD" />
            <StatsCard
              label="Total Frozen Stake"
              value={format(totalFrozenStake)}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
