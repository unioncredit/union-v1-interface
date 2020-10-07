import { useWeb3React } from "@web3-react/core";
import DelegatedModal from "components/DelegatedModal";
import DelegateVotingModal from "components/DelegateVotingModal";
import GovernanceVotingHistory from "components/GovernanceVotingHistory";
import GovernanceVotingWallet from "components/GovernanceVotingWallet";
import { Fragment } from "react";

export default function VotingView() {
  const { account } = useWeb3React();

  return (
    <Fragment>
      <div className="container">
        <div className="pt-16 grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h2>Your voting wallet</h2>
            <div className="pt-6">
              <GovernanceVotingWallet address={account} />
            </div>
          </div>

          <div className="col-span-2">
            <h2>Your voting history</h2>
            <div className="pt-6">
              <GovernanceVotingHistory address={account} />
            </div>
          </div>
        </div>
      </div>

      <DelegatedModal />
      <DelegateVotingModal />
    </Fragment>
  );
}
