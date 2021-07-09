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
              value={formatDetailed(totalBorrows, "DAI")}
            />
            <StatsCard
              label="Total Redeemable"
              value={formatDetailed(totalRedeemable, "DAI")}
            />
            <StatsCard
              label="Total Reserves"
              value={formatDetailed(totalReserves, "DAI")}
            />
            <StatsCard
              label="Defaulted Loan Amount"
              value={formatDetailed(defaultedAmount, "DAI")}
            />
            <StatsCard
              label="Frozen Loan Amount"
              value={formatDetailed(totalFrozenStake, "DAI")}
            />
            <StatsCard
              label="uDAI Supply"
              value={formatDetailed(uTokenSupply, "uDAI")}
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
