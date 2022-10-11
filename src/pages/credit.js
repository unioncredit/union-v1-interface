import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import BorrowView from "views/credit/borrow";
import BlacklistedView from "views/blacklisted";
import { PageHead, CheckIsMember } from "components-ui";
import useIsBlacklisted from "hooks/useIsBlacklisted";

export default function CreditPage() {
  const { account, library } = useWeb3React();
  const isBlacklisted = useIsBlacklisted();

  return (
    <>
      <PageHead title="Credit | Union" />
      {account && library ? (
        isBlacklisted ? (
          <BlacklistedView></BlacklistedView>
        ) : (
          <CheckIsMember>
            <BorrowView />
          </CheckIsMember>
        )
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
