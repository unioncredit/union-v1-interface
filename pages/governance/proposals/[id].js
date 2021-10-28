import { PageHead } from "components-ui";
import ProposalView from "views/governance/proposal";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";

export default function ProposalsPage() {
  const [forceConnect] = useForceConnect();

  return (
    <>
      <PageHead title="Proposal | Union" />
      {forceConnect ? <LoggedOutView /> : <ProposalView />}
    </>
  );
}
