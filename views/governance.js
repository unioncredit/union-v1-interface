import GovernanceNavigation from "components/GovernanceNavigation";
import Link from "next/link";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

export default function GovernanceView() {
  return (
    <Fragment>
      <div className="container">
        <h1 hidden>Governance</h1>

        <nav className="pt-6">
          <GovernanceNavigation />
        </nav>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Statistics</h2>
            <Link href="/">
              <a className="font-semibold inline-flex items-center">
                <span className="mr-1">See all</span> <LinkArrow />
              </a>
            </Link>
          </div>
        </section>

        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2>Recent proposals</h2>
            <Link href="/">
              <a className="font-semibold inline-flex items-center">
                <span className="mr-1">See all</span> <LinkArrow />
              </a>
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
