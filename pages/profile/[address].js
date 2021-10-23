import ProfileView from "views/profile";
import { PageHead } from "components-ui";

export default function ProfilePage() {
  return (
    <>
      <PageHead title="Profile | Union" />
      <ProfileView />
    </>
  );
}
