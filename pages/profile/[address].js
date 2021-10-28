import ProfileView from "views/profile";
import { PageHead } from "components-ui";
import { useRouter } from "next/router";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";

export default function ProfilePage() {
  const { query } = useRouter();
  const [forceConnect] = useForceConnect();

  const { address } = query;

  return (
    <>
      <PageHead title="Profile | Union" />
      {address && (
        <>
          {forceConnect ? <LoggedOutView /> : <ProfileView address={address} />}
        </>
      )}
    </>
  );
}
