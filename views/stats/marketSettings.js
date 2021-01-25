import { Fragment } from "react";
import StatsNavigation from "../../components/stats/StatsNavigation";

export default function MarketSettingsStatsView() {
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
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <li className="border rounded p-4 sm:p-6">
              <p className="crop-snug leading-snug mb-4">Label</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold crop-snug leading-snug">
                  Value
                </p>
                <p className="text-sm leading-none">+100%</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
}
