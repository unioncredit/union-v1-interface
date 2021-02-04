import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useAssetManagerStats from "hooks/stats/assetManagerStats";
import format from "util/formatValue";

export default function AssetManagerStatsView() {
  const {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
  } = useAssetManagerStats();

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
              label="Available Credit"
              value={loanableAmount ? format(loanableAmount) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Pool Balance"
              value={poolBalance ? format(poolBalance) + " DAI" : "NaN"}
            />
            <StatsCard
              label="DAI in Contract"
              value={
                assetManagerDAIBalance
                  ? format(assetManagerDAIBalance) + " DAI"
                  : "NaN"
              }
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}