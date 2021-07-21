import ProposalList from "components/governance/ProposalList";
import StatisticGrid from "components/governance/StatisticGrid";
import useProposalCount from "hooks/governance/useProposalCount";
import Link from "next/link";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

export default function GovernanceView() {
  const { data: proposalCount } = useProposalCount();

  return (
    <Fragment>
      <div className="container">
        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Statistics</h2>
            <Link href="/stats">
              <a className="text-md text-type-lightest">View Detailed Stats</a>
            </Link>
          </div>

          <StatisticGrid />
        </section>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Recent proposals</h2>

            {proposalCount > 5 && (
              <Link href="/governance/proposals">
                <a className="font-semibold inline-flex items-center">
                  <span className="mr-1">See all</span> <LinkArrow.Right />
                </a>
              </Link>
            )}
          </div>

          <ProposalList />
        </section>
      </div>
    </Fragment>
  );
}
