import Back from "components/Back";
import AccountVoteHistory from "components/governance/AccountVoteHistory";
import { ProfileVotingWallet } from "components/governance/AccountVotingWallet";
import DelegateVotingModal from "components/governance/modals/DelegateVotingModal";
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

        <div className="pt-6 md:grid grid-cols-3 gap-4">
          <div className="col-span-1 mb-8 md:mb-0">
            <h2>Profile</h2>
            <div className="pt-6">
              <ProfileVotingWallet address={address} />
            </div>
          </div>

          <div className="col-span-2">
            <h2>Voting history</h2>
            <div className="pt-6">
              <AccountVoteHistory address={address} />
            </div>
          </div>
        </div>
      </div>

      <DelegateVotingModal address={address} />
    </Fragment>
  );
}
