import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import GetStartedView from "views/getStarted";
import { CheckIsMember, PageHead } from "components-ui";

export default function GetStartedPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Get Started | Membership | Union" />
      {account && library ? (
        <CheckIsMember>
          <GetStartedView />
        </CheckIsMember>
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
