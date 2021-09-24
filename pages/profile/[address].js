import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ProfileView from "views/profile";
import { PageHead } from "components-ui";

export default function ProfilePage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Profile | Union" />
      {account && library ? <ProfileView /> : <LoggedOutView />}
    </>
  );
}
