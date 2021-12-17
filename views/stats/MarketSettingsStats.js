import { Stat, Grid } from "union-ui";

import { formatDetailed } from "util/formatValue";
import useMarketSettingsStats from "hooks/stats/marketSettingsStats";

import { toPercent } from "util/numbers";
import useChainId from "hooks/useChainId";
import { BLOCK_SPEED } from "constants/variables";
import { formatUnits } from "@ethersproject/units";
import { unionValue, daiValue } from "./values";

function useMarketSettingsStatsView() {
  const {
    interestRate,
    originationFee,
    overdueBlocks,
    reserveFactor,
    newMemberFee,
    maxBorrow,
    minBorrow,
    debtCeiling,
  } = useMarketSettingsStats();

  const chainId = useChainId();

  const overdueHours = overdueBlocks
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(3600)
    .toNumber();

  const overdueDays = overdueBlocks
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(86400)
    .toNumber();

  return [
    { label: "APR", value: toPercent(interestRate || 0, 2) },
    { label: "Fee", value: toPercent(originationFee || 0, 2) },
    {
      label: "Payment Period",
      value: overdueBlocks
        ? formatDetailed(overdueBlocks, 0) +
          (overdueHours < 48
            ? " (" + overdueHours + " Hours)"
            : " (" + overdueDays + " Days)")
        : "N/A",
    },
    { label: "Reserve Factor", value: reserveFactor },
    {
      label: "Membership Fee",
      value: unionValue(formatUnits(newMemberFee || 0, 18)),
    },
    { label: "Max Borrow", value: daiValue(maxBorrow) },
    { label: "Min Borrow", value: daiValue(minBorrow) },
    { label: "Current Debt Ceiling", value: daiValue(debtCeiling) },
  ];
}

export default function MarketSettingsStats() {
  const stats = useMarketSettingsStatsView();

  return (
    <>
      {stats.map((stat) => (
        <Grid.Col md={3} key={stat.label}>
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
