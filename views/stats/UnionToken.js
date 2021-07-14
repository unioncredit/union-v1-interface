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
    averageInflationPerBlock,
    halfDecayPoint,
    unionPerDAIStaked,
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
              value={formatDetailed(totalSupply, "Union")}
            />
            <StatsCard
              label="Treasury 1 Balance"
              value={formatDetailed(reservoir1UnionBalance, "Union")}
            />
            <StatsCard
              label="Treasury 2 Balance"
              value={formatDetailed(reservoir2UnionBalance, "Union")}
            />
            <StatsCard
              label="Comptroller Balance"
              value={formatDetailed(comptrollerUnionBalance, "Union", 0)}
            />
            <StatsCard
              label="Inflation Per Block"
              value={formatDetailed(unionInflationPerBlock, "Union")}
            />
            <StatsCard
              label="Weekly Average UPB"
              value={formatDetailed(averageInflationPerBlock, "Union")}
            />
            <StatsCard
              label="Union per DAI Staked"
              value={formatDetailed(unionPerDAIStaked, null, 6)}
            />
            <StatsCard
              label="Half Decay Point"
              value={formatDetailed(halfDecayPoint)}
            />
            <StatsCard
              label="Transfers"
              value={
                isUnionTransferPaused === undefined
                  ? "NaN"
                  : isUnionTransferPaused
                  ? "Off"
                  : "On"
              }
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
