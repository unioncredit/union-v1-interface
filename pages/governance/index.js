import LoggedOutView from "views/loggedOut";
import GovernanceView from "views/governance";
import { useForceConnect } from "hooks/useForceConnect";
import { PageHead } from "components-ui";

export default function GovernancePage() {
  const [forceConnect] = useForceConnect();

  return (
    <>
      <PageHead title="Governance | Union" />
      {forceConnect ? <LoggedOutView /> : <GovernanceView />}
    </>
  );
}
