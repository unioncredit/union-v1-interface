import { PageHead } from "components-ui";
import ProposalsView from "views/governance/proposals";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";
import UnsuportedChainProvider from "providers/UnsupportedChain";

export default function ProposalsPage() {
  const [forceConnect] = useForceConnect();

  return (
    <UnsuportedChainProvider chainIds={[421611]}>
      <PageHead title="Proposals | Union" />
      {forceConnect ? <LoggedOutView /> : <ProposalsView />}
    </UnsuportedChainProvider>
  );
}
