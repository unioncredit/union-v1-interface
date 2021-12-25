import Head from "next/head";
import ProfileView from "views/profile";
import { PageHead } from "components-ui";
import { useForceConnect } from "hooks/useForceConnect";
import LoggedOutView from "views/loggedOut";

export default function ProfilePage({ params, host }) {
  const [forceConnect] = useForceConnect();

  const { address } = params;

  return (
    <>
      <PageHead title="Profile | Union" />
      <Head>
        <meta
          key="og:image"
          property="og:image"
          content={`https://${host}/api/og/profile?address=${address}`}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={`https://${host}/api/og/profile?address=${address}`}
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

export function getServerSideProps(context) {
  return {
    props: { params: context.params, host: context.req.headers.host },
  };
}
