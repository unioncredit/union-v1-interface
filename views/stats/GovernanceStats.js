import { Alert, Stat, Grid } from "union-ui";
import Info from "union-ui/lib/icons/wireInfo.svg";

import { formatDetailed } from "util/formatValue";
import useGovernanceStats from "hooks/stats/governanceStats";

import useChainId from "hooks/useChainId";
import { BLOCK_SPEED } from "constants/variables";
import { unionValue } from "./values";
import { withUnsupportedChains } from "providers/UnsupportedChain";
import { useWeb3React } from "@web3-react/core";

function useGovernanceStatsView() {
  const { quorum, votingPeriod, votingDelay, timelock, threshold } =
    useGovernanceStats();

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

  return [
    { label: "Quorum", value: unionValue(quorum) },
    {
      label: "Voting Period",
      value: votingPeriod
        ? formatDetailed(votingPeriod, "", 0) +
          (votingPeriodHours < 48
            ? " (" + votingPeriodHours + " Hours)"
            : " (" + votingPeriodDays + " Days)")
        : "N/A",
    },
    { label: "Delay Period", value: formatDetailed(votingDelay, "Block", 0) },
    {
      label: "Timelock",
      value: timelock
        ? formatDetailed(timelock, 0) +
          (timelockHours < 48
            ? " (" + timelockHours + " Hours)"
            : " (" + timelockDays + " Days)")
        : "N/A",
    },
    { label: "Proposal Threshold", value: unionValue(threshold) },
  ];
}

function GovernanceStats() {
  const chainId = useChainId();
  const { chainId: actualChainId } = useWeb3React();
  const stats = useGovernanceStatsView();

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  return (
    <>
      {unsupportedFeature && (
        <Alert
          icon={<Info />}
          packed
          mt="-24px"
          mb="36px"
          size="small"
          variant="info"
          label="Governance is not supported on this chain. Showing governance data from mainnet"
        />
      )}
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

export default withUnsupportedChains(GovernanceStats, [421611]);
