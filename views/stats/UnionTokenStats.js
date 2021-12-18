import { Stat, Grid } from "union-ui";
import useUnionTokenStats from "hooks/stats/unionTokenStats";
import { daiValue, unionValue } from "./values";

function useUnionStatsView() {
  const {
    totalSupply,
    treasuryVestorBalance,
    reservoir1UnionBalance,
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
    { label: "Treasury 1 balance", value: unionValue(reservoir1UnionBalance) },
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
    { label: "Half decay point", value: daiValue(halfDecayPoint) },
    { label: "Transfers", value: isUnionTransferPaused ? "Off" : "On" },
  ];
}

export default function UnionTokenStats() {
  const stats = useUnionStatsView();

  return (
    <>
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
