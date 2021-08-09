import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import { PageHead } from "components-ui";
import ProposalView from "views/governance/proposal";

export default function ProposalsPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Proposal | Union" />
      {account && library ? <ProposalView /> : <LoggedOutView />}
    </>
  );
}
