import { useWeb3React } from "@web3-react/core";
import Back from "components/governance/Back";
import DelegatedModal from "components/governance/DelegatedModal";
import DelegateVotingModal from "components/governance/DelegateVotingModal";
import GovernanceVotingHistory from "components/GovernanceVotingHistory";
import { GovernanceVotingProfile } from "components/GovernanceVotingWallet";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function AddressView() {
  const { query } = useRouter();
  const { address } = query;

  const { account, library } = useWeb3React();

  if (account && library)
    return (
      <Fragment>
        <div className="container">
          {/* Spacer */}
          <div className="h-8" />

          <div>
            <Back />
          </div>

          {/* Spacer */}
          <div className="h-8" />

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <h2>Profile</h2>
              <div className="pt-6">
                <GovernanceVotingProfile address={address} />
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

        <DelegatedModal />
        <DelegateVotingModal address={address} />
      </Fragment>
    );

  return null;
}
