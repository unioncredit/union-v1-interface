import { Fragment } from "react";
import StatsNavigation from "../../components/stats/StatsNavigation";
import StatsCard from "../../components/stats/StatsCard";
import StatsGrid from "../../components/stats/StatsGrid";

export default function AssetManagerStatsView() {
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
            <StatsCard label="Available Credit" value="10000" />
            <StatsCard label="Pool Balance" value="100000" />
            <StatsCard label="DAI in Contract" value="10000" />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
