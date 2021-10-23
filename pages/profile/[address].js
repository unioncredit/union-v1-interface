import ProfileView from "views/profile";
import { PageHead } from "components-ui";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { query } = useRouter();
  const { address } = query;

  return (
    <>
      <PageHead title="Profile | Union" />
      {address && <ProfileView address={address} />}
    </>
  );
}
