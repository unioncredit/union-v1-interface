import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";

export default function MarketSettingsStatsView() {
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
            <StatsCard label="APR" value="20%" />
            <StatsCard label="Fee" value="2%" />
            <StatsCard label="Payment Period" value="30" />
            <StatsCard label="Reserve Factor" value="5" />
            <StatsCard label="Membership Fee" value="200" />
            <StatsCard label="Min & Max Borrow" value="100" />
            <StatsCard label="Current Debt Ceiling" value="1000" />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
