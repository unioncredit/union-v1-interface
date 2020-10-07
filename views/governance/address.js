import { useWeb3React } from "@web3-react/core";
import GovernanceVotingHistory from "components/GovernanceVotingHistory";
import { GovernanceVotingProfile } from "components/GovernanceVotingWallet";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

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
            <Link href="/governance">
              <a className="font-semibold inline-flex align-middle items-center">
                <LinkArrow.Left /> <span className="ml-1">Back</span>
              </a>
            </Link>
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
      </Fragment>
    );

  return null;
}
