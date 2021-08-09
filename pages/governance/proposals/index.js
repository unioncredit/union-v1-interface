import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import { PageHead } from "components-ui";
import ProposalsView from "views/governance/proposals";

export default function ProposalsPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Proposals | Union" />
      {account && library ? <ProposalsView /> : <LoggedOutView />}
    </>
  );
}
