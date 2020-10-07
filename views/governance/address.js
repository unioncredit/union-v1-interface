import GovernanceVotingHistory from "components/GovernanceVotingHistory";
import GovernanceVotingWallet from "components/GovernanceVotingWallet";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function AddressView() {
  const { query } = useRouter();
  const { address } = query;

  return (
    <Fragment>
      <div className="container">
        <div className="pt-16 grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h2>Profile</h2>
            <div className="pt-6">
              <GovernanceVotingWallet address={address} />
            </div>
          </div>

          <div className="col-span-2">
            <h2>Voting history</h2>
            <div className="pt-6">
              <GovernanceVotingHistory address={address} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
