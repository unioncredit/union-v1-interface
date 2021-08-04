import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import StakeView from "views/getStarted/stake";
import { PageHead } from "components-ui";

export default function StakePage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Get Started | Stake | Union" />
      {account && library ? <StakeView /> : <LoggedOutView />}
    </>
  );
}
