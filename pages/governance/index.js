import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import GovernanceView from "views/governance";
import { PageHead } from "components-ui";

export default function GovernancePage() {
  const { account, library } = useWeb3React();

  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <PageHead title="Governance | Union" />
      {account && library ? <GovernanceView /> : <LoggedOutView />}
    </div>
  );
}
