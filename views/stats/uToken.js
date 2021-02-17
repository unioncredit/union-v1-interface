import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import useUTokenStats from "hooks/stats/uTokenStats";
import useUserManagerStats from "hooks/stats/userManagerStats";
import format from "util/formatValue";

export default function UTokenStatsView() {
  const {
    totalBorrows,
    totalRedeemable,
    totalReserves,
    uTokenSupply,
    uTokenRate,
    defaultedAmount,
  } = useUTokenStats();

  const { totalFrozenStake } = useUserManagerStats();

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
            <StatsCard
              label="Total Borrowed"
              value={totalBorrows ? format(totalBorrows) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Total Redeemable"
              value={totalRedeemable ? format(totalRedeemable) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Total Reserves"
              value={totalReserves ? format(totalReserves) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Defaulted Loan Amount"
              value={defaultedAmount ? format(defaultedAmount) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Frozen Loan Amount"
              value={
                totalFrozenStake ? format(totalFrozenStake) + " DAI" : "NaN"
              }
            />
            <StatsCard
              label="uDAI Supply"
              value={uTokenSupply ? format(uTokenSupply) + " uDAI" : "NaN"}
            />
            <StatsCard
              label="DAI/uDAI Exchange Rate"
              value={format(uTokenRate)}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
