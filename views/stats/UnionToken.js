import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import useUnionTokenStats from "hooks/stats/unionTokenStats";
import { formatDetailed } from "util/formatValue";

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
              label="Total Supply"
              value={
                totalSupply ? formatDetailed(totalSupply) + " Union" : "NaN"
              }
            />
            <StatsCard
              label="Reservoir 1 Balance"
              value={
                reservoir1UnionBalance
                  ? formatDetailed(reservoir1UnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Reservoir 2 Balance"
              value={
                reservoir1UnionBalance
                  ? formatDetailed(reservoir2UnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Comptroller Balance"
              value={
                comptrollerUnionBalance
                  ? formatDetailed(comptrollerUnionBalance) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Actual UPB"
              value={
                unionInflationPerBlock
                  ? formatDetailed(unionInflationPerBlock) + " Union"
                  : "NaN"
              }
            />
            <StatsCard
              label="Inflation Index"
              value={
                unionInflationIndex
                  ? formatDetailed(unionInflationIndex)
                  : "NaN"
              }
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
