import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import useAssetManagerStats from "hooks/stats/assetManagerStats";
import format from "util/formatValue";

export default function AssetManagerStatsView() {
  const {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
    daiInLendingProtocols,
  } = useAssetManagerStats();

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
            <StatsCard
              label="DAI In Lending Protocols"
              value={
                daiInLendingProtocols
                  ? format(daiInLendingProtocols) + " DAI"
                  : "NaN"
              }
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
