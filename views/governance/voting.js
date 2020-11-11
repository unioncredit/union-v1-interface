import { useWeb3React } from "@web3-react/core";
import CreateProposalModal from "components/governance/CreateProposalModal";
import DelegateVotingModal from "components/governance/AccountVotingWallet/node_modules/components/governance/DelegateVotingModal";
import AccountVoteHistory from "components/governance/AccountVoteHistory";
import AccountVotingWallet from "components/governance/AccountVotingWallet";
import { Fragment } from "react";
import ChooseDelegationModal from "../../components/governance/modals/ChooseDelegationModal";

export default function VotingView() {
  const { account } = useWeb3React();

  return (
    <Fragment>
      <div className="container">
        <div className="pt-16 md:grid grid-cols-3 gap-4">
          <div className="col-span-1 mb-8 md:mb-0">
            <h2>Your voting wallet</h2>
            <div className="pt-6">
              <AccountVotingWallet address={account} />
            </div>
          </div>

          <div className="col-span-2">
            <h2>Your voting history</h2>
            <div className="pt-6">
              <AccountVoteHistory address={account} />
            </div>
          </div>
        </div>
      </div>

      <DelegateVotingModal />
      <ChooseDelegationModal />
      <CreateProposalModal />
    </Fragment>
  );
}
