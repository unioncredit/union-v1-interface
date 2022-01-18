import LoggedOutView from "views/loggedOut";
import StatsView from "views/stats";
import { useForceConnect } from "hooks/useForceConnect";
import { PageHead } from "components-ui";

export default function StatsPage() {
  const [forceConnect] = useForceConnect();

  return (
    <>
      <PageHead title="Stats | Union" />
      {forceConnect ? <LoggedOutView /> : <StatsView />}
    </>
  );
}
