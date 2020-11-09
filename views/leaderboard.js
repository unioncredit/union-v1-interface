import Back from "components/governance/Back";
import LeaderboardTable from "components/LeaderboardTable";
import { Fragment } from "react";

export default function LeaderboardView() {
  return (
    <Fragment>
      <h1 hidden>Leaderboard</h1>

      <div className="container">
        {/* Spacer */}
        <div className="h-8" />

        <div>
          <Back />
        </div>

        {/* Spacer */}
        <div className="h-8" />

        <h1>Leaderboard</h1>

        {/* Spacer */}
        <div className="h-8" />

        <LeaderboardTable disablePagination />
      </div>
    </Fragment>
  );
}
