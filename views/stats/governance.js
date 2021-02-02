import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useGovernanceStats from "hooks/stats/governanceStats";
import format from "util/formatValue";

export default function GovernanceStatsView() {
  const {
    quorum,
    threshold,
    votingPeriod,
    votingDelay,
    timelock,
  } = useGovernanceStats();

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
            <StatsCard label="Quorum" value={format(quorum)} />
            <StatsCard label="Proposal Threshold" value={format(threshold)} />
            <StatsCard label="Voting Period" value={format(votingPeriod)} />
            <StatsCard label="Delay Period" value={format(votingDelay)} />
            <StatsCard label="Timelock" value={format(timelock)} />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
