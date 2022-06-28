import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import StakeView from "views/credit/stake";
import { PageHead, CheckIsMember } from "components-ui";

export default function StakePage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Lend | Union" />
      {account && library ? (
        <CheckIsMember>
          <StakeView />
        </CheckIsMember>
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
