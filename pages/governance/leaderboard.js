import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import { PageHead } from "components-ui";

export default function LeaderboardPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Leaderboard | Union" />
      {account && library ? "Not yet implemented" : <LoggedOutView />}
    </>
  );
}