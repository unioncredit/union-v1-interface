import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";

export default function GovernanceStatsView() {
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
            <StatsCard label="Quorum" value="200000" />
            <StatsCard label="Proposal Threshold" value="20000" />
            <StatsCard label="Voting Period" value="30" />
            <StatsCard label="Delay Period" value="50" />
            <StatsCard label="Timelock" value="50" />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
