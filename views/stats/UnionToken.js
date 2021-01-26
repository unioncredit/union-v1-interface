import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";

export default function UnionTokenStatsView() {
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
            <StatsCard label="Total Supply" value="100000" />
            <StatsCard label="Reservoir Balance" value="10000" />
            <StatsCard label="Comptroller Balance" value="10000" />
            <StatsCard label="Annualized Inflation" value="20%" />
            <StatsCard label="UPB" value="1000" />
            <StatsCard label="Transfers" value="off" />
            <StatsCard label="Total Borrowed" value="20000" />
            <StatsCard label="Total Redeemable" value="20000" />
            <StatsCard label="Total Reserves" value="200000" />
            <StatsCard label="Defaulted Loan Amount" value="4000" />
            <StatsCard label="Frozen Loan Amount" value="40000" />
            <StatsCard label="uDAI Supply" value="400000" />
            <StatsCard label="DAI/uDAI Exchange Rate" value="20" />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
