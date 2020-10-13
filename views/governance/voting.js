import { useWeb3React } from "@web3-react/core";
import DelegateVotingModal from "components/governance/DelegateVotingModal";
import GovernanceVotingHistory from "components/governance/GovernanceVotingHistory";
import GovernanceVotingWallet from "components/governance/GovernanceVotingWallet";
import { Fragment } from "react";
import ChooseDelegationModal from "../../components/governance/ChooseDelegationModal";

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

      <DelegateVotingModal />
      <ChooseDelegationModal />
    </Fragment>
  );
}
