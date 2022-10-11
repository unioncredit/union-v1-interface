import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import StakeView from "views/credit/stake";
import BlacklistedView from "views/blacklisted";
import { PageHead, CheckIsMember } from "components-ui";
import useIsBlacklisted from "hooks/useIsBlacklisted";

export default function StakePage() {
  const { account, library } = useWeb3React();
  const isBlacklisted = useIsBlacklisted();

  return (
    <>
      <PageHead title="Lend | Union" />
      {account && library ? (
        isBlacklisted ? (
          <BlacklistedView></BlacklistedView>
        ) : (
          <CheckIsMember>
            <StakeView />
          </CheckIsMember>
        )
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
