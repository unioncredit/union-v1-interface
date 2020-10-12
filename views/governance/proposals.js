import Back from "components/governance/Back";
import GovernanceProposals from "components/GovernanceProposals";
import { Fragment } from "react";

export default function ProposalsView() {
  return (
    <Fragment>
      <h1 hidden>Proposals</h1>

      <div className="container">
        {/* Spacer */}
        <div className="h-8" />

        <div>
          <Back />
        </div>

        {/* Spacer */}
        <div className="h-8" />

        <h1>Governance proposals</h1>

        {/* Spacer */}
        <div className="h-8" />

        <GovernanceProposals showAll />
      </div>
    </Fragment>
  );
}
