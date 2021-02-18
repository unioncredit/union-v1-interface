import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import useUTokenStats from "hooks/stats/uTokenStats";
import useUserManagerStats from "hooks/stats/userManagerStats";
import { formatDetailed } from "util/formatValue";

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
              value={
                totalBorrows ? formatDetailed(totalBorrows) + " DAI" : "NaN"
              }
            />
            <StatsCard
              label="Total Redeemable"
              value={
                totalRedeemable
                  ? formatDetailed(totalRedeemable) + " DAI"
                  : "NaN"
              }
            />
            <StatsCard
              label="Total Reserves"
              value={
                totalReserves ? formatDetailed(totalReserves) + " DAI" : "NaN"
              }
            />
            <StatsCard
              label="Defaulted Loan Amount"
              value={
                defaultedAmount
                  ? formatDetailed(defaultedAmount) + " DAI"
                  : "NaN"
              }
            />
            <StatsCard
              label="Frozen Loan Amount"
              value={
                totalFrozenStake
                  ? formatDetailed(totalFrozenStake) + " DAI"
                  : "NaN"
              }
            />
            <StatsCard
              label="uDAI Supply"
              value={
                uTokenSupply ? formatDetailed(uTokenSupply) + " uDAI" : "NaN"
              }
            />
            <StatsCard
              label="DAI/uDAI Exchange Rate"
              value={formatDetailed(uTokenRate)}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
