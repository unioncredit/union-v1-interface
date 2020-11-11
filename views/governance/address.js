import Back from "components/Back";
import DelegateVotingModal from "components/governance/DelegateVotingModal";
import ProposalVoteHistoryList from "components/governance/ProposalVoteHistoryList";
import { VotingProfile } from "components/governance/VotingWallet";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function AddressView() {
  const { query } = useRouter();
  const { address } = query;

  return (
    <Fragment>
      <div className="container">
        {/* Spacer */}
        <div className="h-6" />

        <div className="h-12 flex items-center">
          <Back />
        </div>

        <div className="pt-16 md:grid grid-cols-3 gap-4">
          <div className="col-span-1 mb-8 md:mb-0">
            <h2>Profile</h2>
            <div className="pt-6">
              <VotingProfile address={address} />
            </div>
          </div>

          <div className="col-span-2">
            <h2>Voting history</h2>
            <div className="pt-6">
              <ProposalVoteHistoryList address={address} />
            </div>
          </div>
        </div>
      </div>

      <DelegateVotingModal address={address} />
    </Fragment>
  );
}
