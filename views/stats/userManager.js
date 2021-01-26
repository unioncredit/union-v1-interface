import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";

export default function UserManagerStatsView() {
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
            <StatsCard label="Total Staked DAI" value="10000" />
            <StatsCard label="Effective Total Stake" value="100000" />
            <StatsCard label="Total Locked Stake" value="10000" />
            <StatsCard label="Defaulted Stake" value="10000" />
            <StatsCard label="Total Frozen Stake" value="10000" />
            <StatsCard label="Effective = Total - Frozen" value="yes" />
            <StatsCard label="Defaulted ≥ Frozen" value="yes" />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
