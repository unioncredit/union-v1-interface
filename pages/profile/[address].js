import Head from "next/head";
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
      <Head>
        <meta
          key="og:image"
          property="og:image"
          content={`https://bluejay.union.finance/api/og/profile?address=${address}`}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={`https://bluejay.union.finance/api/og/profile?address=${address}`}
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content={`Union Member ${address}`}
        />
      </Head>

      {address && (
        <>
          {forceConnect ? <LoggedOutView /> : <ProfileView address={address} />}
        </>
      )}
    </>
  );
}
