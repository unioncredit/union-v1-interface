import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import StatsHeader from "components/stats/StatsHeader";
import { BLOCK_SPEED } from "constants/variables";
import useMarketSettingsStats from "hooks/stats/marketSettingsStats";
import useChainId from "hooks/useChainId";
import { formatDetailed } from "util/formatValue";
import { toPercent } from "util/numbers";

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

  const chainId = useChainId();

  const overdueHours = overdueBlocks
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(3600)
    .toNumber();

  const overdueDays = overdueBlocks
    ?.mul(BLOCK_SPEED[chainId])
    ?.div(86400)
    .toNumber();

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
            <StatsCard label="APR" value={toPercent(interestRate || 0, 2)} />
            <StatsCard label="Fee" value={toPercent(originationFee || 0, 2)} />
            <StatsCard
              label="Payment Period"
              value={
                overdueBlocks
                  ? formatDetailed(overdueBlocks, 0) +
                    (overdueHours < 48
                      ? " (" + overdueHours + " Hours)"
                      : " (" + overdueDays + " Days)")
                  : "NaN"
              }
            />
            <StatsCard
              label="Reserve Factor"
              value={formatDetailed(reserveFactor)}
            />
            <StatsCard
              label="Membership Fee"
              value={
                newMemberFee ? formatDetailed(newMemberFee) + " Union" : "NaN"
              }
            />
            <StatsCard
              label="Max Borrow"
              value={maxBorrow ? formatDetailed(maxBorrow) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Min Borrow"
              value={minBorrow ? formatDetailed(minBorrow) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Current Debt Ceiling"
              value={debtCeiling ? formatDetailed(debtCeiling) + " DAI" : "NaN"}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
