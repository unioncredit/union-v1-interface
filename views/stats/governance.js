import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
import useProposalThreshold from "hooks/governance/useProposalThreshold";
import useVotingPeriod from "hooks/stats/useVotingPeriod";
import useVotingDelay from "hooks/stats/useVotingDelay";
import useTimelock from "hooks/stats/useTimelock";
import format from "util/formatValue";

export default function GovernanceStatsView() {
  const { data: quorum } = useProposalQuorum();
  const { data: threshold } = useProposalThreshold();
  const { data: votingPeriod } = useVotingPeriod();
  const { data: votingDelay } = useVotingDelay();
  const { data: timelock } = useTimelock();

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
