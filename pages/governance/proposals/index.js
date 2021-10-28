import { PageHead } from "components-ui";
import ProposalsView from "views/governance/proposals";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";

export default function ProposalsPage() {
  const [forceConnect] = useForceConnect();

  return (
    <>
      <PageHead title="Proposals | Union" />
      {forceConnect ? <LoggedOutView /> : <ProposalsView />}
    </>
  );
}
