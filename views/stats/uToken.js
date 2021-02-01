import { Fragment } from "react";
import StatsNavigation from "components/stats/StatsNavigation";
import StatsCard from "components/stats/StatsCard";
import StatsGrid from "components/stats/StatsGrid";
import useTotalBorrows from "hooks/stats/useTotalBorrows";
import useTotalRedeemable from "hooks/stats/useTotalRedeemable";
import useTotalReserves from "hooks/stats/useTotalReserves";
import useUTokenSupply from "hooks/stats/useUTokenSupply";
import useUTokenRate from "hooks/stats/useUTokenRate";
import format from "util/formatValue";

export default function UTokenStatsView() {
  const { data: totalBorrows } = useTotalBorrows();
  const { data: totalRedeemable } = useTotalRedeemable();
  const { data: totalReserves } = useTotalReserves();
  const { data: uTokenSupply } = useUTokenSupply();
  const { data: uTokenRate } = useUTokenRate();

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
            <StatsCard label="Total Borrowed" value={format(totalBorrows)} />
            <StatsCard
              label="Total Redeemable"
              value={format(totalRedeemable)}
            />
            <StatsCard label="Total Reserves" value={format(totalReserves)} />
            <StatsCard label="Defaulted Loan Amount" value="TBD" />
            <StatsCard label="Frozen Loan Amount" value="TBD" />
            <StatsCard label="uDAI Supply" value={format(uTokenSupply)} />
            <StatsCard
              label="DAI/uDAI Exchange Rate"
              value={format(uTokenRate)}
            />
          </StatsGrid>
        </div>
      </section>
    </Fragment>
  );
}
