import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import { PageHead } from "components-ui";
import AddressView from "views/governance/address";

export default function ProfilePage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Profile | Union" />
      {account && library ? <AddressView /> : <LoggedOutView />}
    </>
  );
}
