import { Stat, Grid } from "union-ui";
import { Union } from "components-ui";

import format from "util/formatValue";
import useUnionTokenStats from "hooks/stats/unionTokenStats";

const unionValue = (value, decimal = 4) => (
  <Union value={format(value, decimal)} />
);

function useUnionStatsView() {
  const {
    totalSupply,
    treasuryVestorBalance,
    reservoir1UnionBalance,
    reservoir2UnionBalance,
    comptrollerUnionBalance,
    isUnionTransferPaused,
    unionInflationPerBlock,
    averageInflationPerBlock,
    halfDecayPoint,
    unionPerDAIStaked,
  } = useUnionTokenStats();

  return [
    { label: "Total supply", value: unionValue(totalSupply) },
    {
      label: "Treasury vestor balance",
      value: unionValue(treasuryVestorBalance),
    },
    { label: "Reservoir 1 balance", value: unionValue(reservoir1UnionBalance) },
    { label: "Reservoir 2 balance", value: unionValue(reservoir2UnionBalance) },
    {
      label: "Comptroller balance",
      value: unionValue(comptrollerUnionBalance),
    },
    {
      label: "Inflation per Block",
      value: unionValue(unionInflationPerBlock, 4),
    },
    {
      label: "Weekly average UPB",
      value: unionValue(averageInflationPerBlock, 6),
    },
    { label: "Union per DAI staked", value: unionValue(unionPerDAIStaked, 6) },
    { label: "Half decay point", value: unionValue(halfDecayPoint) },
    { label: "Transfers", value: isUnionTransferPaused ? "Off" : "On" },
  ];
}

export default function UnionTokenStats() {
  const stats = useUnionStatsView();

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
