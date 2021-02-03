import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import { BLOCK_SPEED } from "constants/variables";
import useMarketSettingsStats from "hooks/stats/marketSettingsStats";
import useChainId from "hooks/useChainId";
import format from "util/formatValue";

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
              label="APR"
              value={interestRate ? format(interestRate) + "%" : "NaN"}
            />
            <StatsCard
              label="Fee"
              value={originationFee ? format(originationFee) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Payment Period"
              value={
                overdueBlocks
                  ? overdueHours < 48
                    ? format(overdueBlocks, 0) + " (" + overdueHours + " Hours)"
                    : format(overdueBlocks, 0) + " (" + overdueDays + " Days)"
                  : "NaN"
              }
            />
            <StatsCard label="Reserve Factor" value={format(reserveFactor)} />
            <StatsCard
              label="Membership Fee"
              value={newMemberFee ? format(newMemberFee) + " Union" : "NaN"}
            />
            <StatsCard
              label="Max Borrow"
              value={maxBorrow ? format(maxBorrow) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Min Borrow"
              value={minBorrow ? format(minBorrow) + " DAI" : "NaN"}
            />
            <StatsCard
              label="Current Debt Ceiling"
              value={debtCeiling ? format(debtCeiling) + " DAI" : "NaN"}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
