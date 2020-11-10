import Proposals from "components/governance/GovernanceProposals";
import Statistics from "components/governance/GovernanceStatistics";
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
          </div>

          <Statistics />
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

          <Proposals />
        </section>
      </div>
    </Fragment>
  );
}
