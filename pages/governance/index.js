import LoggedOutView from "views/loggedOut";
import GovernanceView from "views/governance";
import { useForceConnect } from "hooks/useForceConnect";
import { PageHead } from "components-ui";
import UnsuportedChainProvider from "providers/UnsupportedChain";

export default function GovernancePage() {
  const [forceConnect] = useForceConnect();

  return (
    <UnsuportedChainProvider chainIds={[421611]}>
      <PageHead title="Governance | Union" />
      {forceConnect ? <LoggedOutView /> : <GovernanceView />}
    </UnsuportedChainProvider>
  );
}
