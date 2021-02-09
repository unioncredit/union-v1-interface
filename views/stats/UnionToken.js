import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useUnionTokenStats from "hooks/stats/unionTokenStats";
import format from "util/formatValue";

export default function UnionTokenStatsView() {
  const {
    totalSupply,
    reservoir1UnionBalance,
    reservoir2UnionBalance,
    comptrollerUnionBalance,
    isUnionTransferPaused,
    unionInflationPerBlock,
    unionInflationIndex,
  } = useUnionTokenStats();

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
              label="Total Supply"
              value={totalSupply ? format(totalSupply) + " Union" : "NaN"}
            />
            <StatsCard
              label="Reservoir 1 Balance"
              value={
                reservoir1UnionBalance
                  ? format(reservoir1UnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Reservoir 2 Balance"
              value={
                reservoir1UnionBalance
                  ? format(reservoir2UnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Comptroller Balance"
              value={
                comptrollerUnionBalance
                  ? format(comptrollerUnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Actual UPB"
              value={
                unionInflationPerBlock
                  ? format(unionInflationPerBlock) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Inflation Index"
              value={unionInflationIndex ? format(unionInflationIndex) : "NaN"}
            />
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
