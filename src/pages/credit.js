import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import BorrowView from "views/credit/borrow";
import { PageHead, CheckIsMember } from "components-ui";

export default function CreditPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Credit | Union" />
      {account && library ? (
        <CheckIsMember>
          <BorrowView />
        </CheckIsMember>
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
