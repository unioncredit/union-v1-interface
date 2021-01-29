import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useUnionTokenSupply from "hooks/stats/useUnionTokenSupply";
import useComptrollerUnionBalance from "hooks/stats/useComptrollerUnionBalance";
import useReservoirUnionBalance from "hooks/stats/useReservoirUnionBalance";
import useUnionPausedState from "hooks/stats/useUnionPausedState";
import format from "util/formatValue";

export default function UnionTokenStatsView() {
  const { data: totalSupply } = useUnionTokenSupply();
  const { data: reservoirUnionBalance } = useReservoirUnionBalance();
  const { data: comptrollerUnionBalance } = useComptrollerUnionBalance();
  const { data: isUnionTransferPaused } = useUnionPausedState();

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
            <StatsCard label="Total Supply" value={format(totalSupply)} />
            <StatsCard
              label="Reservoir Balance"
              value={format(reservoirUnionBalance)}
            />
            <StatsCard
              label="Comptroller Balance"
              value={format(comptrollerUnionBalance)}
            />
            <StatsCard label="Annualized Inflation" value="20%" />
            <StatsCard label="UPB" value="1000" />
            <StatsCard
              label="Transfers"
              value={isUnionTransferPaused ? "Off" : "On"}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
