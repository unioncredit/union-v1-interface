import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import GetStartedView from "views/getStarted";
import BlacklistedView from "views/blacklisted";
import { CheckIsMember, PageHead } from "components-ui";
import useIsBlacklisted from "hooks/useIsBlacklisted";

export default function GetStartedPage() {
  const { account, library } = useWeb3React();
  const isBlacklisted = useIsBlacklisted();
  return (
    <>
      <PageHead title="Get Started | Membership | Union" />
      {account && library ? (
        isBlacklisted ? (
          <BlacklistedView></BlacklistedView>
        ) : (
          <CheckIsMember>
            <GetStartedView />
          </CheckIsMember>
        )
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
