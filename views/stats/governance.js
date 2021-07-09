import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import { BLOCK_SPEED } from "constants/variables";
import useGovernanceStats from "hooks/stats/governanceStats";
import useChainId from "hooks/useChainId";
import { formatDetailed } from "util/formatValue";

export default function GovernanceStatsView() {
  const {
    quorum,
    threshold,
    votingPeriod,
    votingDelay,
    timelock,
  } = useGovernanceStats();

  const chainId = useChainId();

  const votingPeriodHours = votingPeriod
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(3600)
    .toNumber();

  const votingPeriodDays = votingPeriod
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(86400)
    .toNumber();

  const timelockHours = timelock?.div(3600).toNumber();

  const timelockDays = timelock?.div(86400).toNumber();

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
            <StatsCard label="Quorum" value={formatDetailed(quorum, "Union")} />
            <StatsCard
              label="Proposal Threshold"
              value={formatDetailed(threshold, "Union")}
            />
            <StatsCard
              label="Voting Period"
              value={
                votingPeriod
                  ? formatDetailed(votingPeriod, "", 0) +
                    (votingPeriodHours < 48
                      ? " (" + votingPeriodHours + " Hours)"
                      : " (" + votingPeriodDays + " Days)")
                  : "NaN"
              }
            />
            <StatsCard
              label="Delay Period"
              value={formatDetailed(votingDelay, "Block", 0)}
            />
            <StatsCard
              label="Timelock"
              value={
                timelock
                  ? formatDetailed(timelock, 0) +
                    (timelockHours < 48
                      ? " (" + timelockHours + " Hours)"
                      : " (" + timelockDays + " Days)")
                  : "NaN"
              }
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
