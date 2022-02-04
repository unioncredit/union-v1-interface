import { PageHead } from "components-ui";
import ProposalView from "views/governance/proposal";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";
import UnsuportedChainProvider from "providers/UnsupportedChain";

export default function ProposalsPage() {
  const [forceConnect] = useForceConnect();

  return (
    <UnsuportedChainProvider chainIds={[421611]}>
      <PageHead title="Proposal | Union" />
      {forceConnect ? <LoggedOutView /> : <ProposalView />}
    </UnsuportedChainProvider>
  );
}
