import LeaderboardTable from "components/LeaderboardTable";
import Link from "next/link";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

export default function LeaderboardView() {
  return (
    <Fragment>
      <h1 hidden>Leaderboard</h1>

      <div className="container">
        {/* Spacer */}
        <div className="h-8" />

        <div>
          <Link href="/governance">
            <a className="font-semibold inline-flex align-middle items-center">
              <LinkArrow.Left /> <span className="ml-1">Back</span>
            </a>
          </Link>
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
