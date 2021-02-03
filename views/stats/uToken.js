import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useUTokenStats from "hooks/stats/uTokenStats";
import format from "util/formatValue";

export default function UTokenStatsView() {
  const {
    totalBorrows,
    totalRedeemable,
    totalReserves,
    uTokenSupply,
    uTokenRate,
  } = useUTokenStats();

  return (
    <Fragment>
      <section className="mb-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl">Union Stats</h1>
          </div>

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
              value={
                totalRedeemable ? format(totalRedeemable) + " uDAI" : "NaN"
              }
            />
            <StatsCard
              label="Total Reserves"
              value={totalReserves ? format(totalReserves) + " DAI" : "NaN"}
            />
            <StatsCard label="Defaulted Loan Amount" value="TBD" />
            <StatsCard label="Frozen Loan Amount" value="TBD" />
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
