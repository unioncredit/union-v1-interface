import GovernanceVotingHistory from "components/GovernanceVotingHistory";
import GovernanceVotingWallet from "components/GovernanceVotingWallet";
import { Fragment } from "react";

export default function VotingView() {
  return (
    <Fragment>
      <div className="container">
        <div className="pt-16 grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <h2>Your voting wallet</h2>
            <div className="pt-6">
              <GovernanceVotingWallet />
            </div>
          </div>

          <div className="col-span-8">
            <h2>Your voting history</h2>
            <div className="pt-6">
              <GovernanceVotingHistory />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
