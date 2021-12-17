import { Stat, Grid } from "union-ui";

import format from "util/formatValue";
import useUTokenStats from "hooks/stats/uTokenStats";
import { daiValue } from "./values";

function useUTokenStatsView() {
  const {
    totalBorrows,
    totalRedeemable,
    totalReserves,
    uTokenSupply,
    uTokenRate,
    defaultedAmount,
  } = useUTokenStats();

  return [
    { label: "Total Borrowed", value: daiValue(totalBorrows) },
    { label: "Total Redeemable", value: daiValue(totalRedeemable) },
    { label: "Total Reserves", value: daiValue(totalReserves) },
    { label: "Total Supply", value: <>{format(uTokenSupply, 4)} uDAI</> },
    { label: "DAI/uDAI Exchange Rate", value: format(uTokenRate, 4) },
    { label: "Defaulted Amount", value: daiValue(defaultedAmount) },
  ];
}

export default function UTokenStats() {
  const stats = useUTokenStatsView();

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
