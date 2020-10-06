import Proposals from "components/GovernanceProposals";
import Statistics from "components/GovernanceStatistics";
import LeaderboardTable from "components/LeaderboardTable";
import useAllProposalData from "hooks/governance/useAllProposalData";
import Link from "next/link";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

export default function GovernanceView() {
  const { data: proposals } = useAllProposalData();

  return (
    <Fragment>
      <div className="container">
        <pre>
          <code>{JSON.stringify(proposals, null, 2)}</code>
        </pre>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Statistics</h2>

            <Link href="/governance/statistics">
              <a className="font-semibold inline-flex items-center">
                <span className="mr-1">See all</span> <LinkArrow.Right />
              </a>
            </Link>
          </div>

          <Statistics />
        </section>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Recent proposals</h2>

            <Link href="/governance/proposals">
              <a className="font-semibold inline-flex items-center">
                <span className="mr-1">See all</span> <LinkArrow.Right />
              </a>
            </Link>
          </div>

          <Proposals />
        </section>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Leaderboard</h2>

            <Link href="/governance/leaderboard">
              <a className="font-semibold inline-flex items-center">
                <span className="mr-1">See all</span> <LinkArrow.Right />
              </a>
            </Link>
          </div>

          <LeaderboardTable />
        </section>
      </div>
    </Fragment>
  );
}
