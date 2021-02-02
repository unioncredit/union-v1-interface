import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useMarketSettingsStats from "hooks/stats/marketSettingsStats";
import format from "util/formatValue";

export default function MarketSettingsStatsView() {
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
              label="APR"
              value={interestRate ? format(interestRate) + "%" : "NaN"}
            />
            <StatsCard label="Fee" value={format(originationFee)} />
            <StatsCard label="Payment Period" value={format(overdueBlocks)} />
            <StatsCard label="Reserve Factor" value={format(reserveFactor)} />
            <StatsCard label="Membership Fee" value={format(newMemberFee)} />
            <StatsCard label="Max Borrow" value={format(maxBorrow)} />
            <StatsCard label="Min Borrow" value={format(minBorrow)} />
            <StatsCard
              label="Current Debt Ceiling"
              value={format(debtCeiling)}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
