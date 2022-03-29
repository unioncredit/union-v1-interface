import { Stat, Grid } from "@unioncredit/ui";
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
    halfDecayPoint,
    unionPerDAIStaked,
  } = useUnionTokenStats();

  const blocksPerDay = 5760;

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
      value: unionValue(unionInflationPerBlock, 8),
    },
    {
      label: "Union per 1K DAI staked per day",
      value: unionValue(
        unionPerDAIStaked ? unionPerDAIStaked * 1000 * blocksPerDay : 0,
        8
      ),
    },
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
