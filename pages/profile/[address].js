import Head from "next/head";
import ProfileView from "views/profile";
import { PageHead } from "components-ui";
import { useForceConnect } from "hooks/useForceConnect";
import useENS from "hooks/useENS";
import LoggedOutView from "views/loggedOut";
import { isAddress } from "@ethersproject/address";

export default function ProfilePage({ params, host }) {
  const [forceConnect] = useForceConnect();
  const { address } = params;
  const hasAddress = isAddress(address);
  let ENSAddress;
  if (!hasAddress) {
    const ens = useENS(address);
    ENSAddress = ens.address;
  }
  const userAddress = hasAddress ? address : ENSAddress;

  return (
    <>
      <PageHead title="Profile | Union" />
      <Head>
        <meta
          key="og:image"
          property="og:image"
          content={`https://${host}/api/og/profile?address=${userAddress}`}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={`https://${host}/api/og/profile?address=${userAddress}`}
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content={`Union Member ${userAddress}`}
        />
      </Head>

      {address && (
        <>
          {forceConnect ? (
            <LoggedOutView />
          ) : userAddress ? (
            <ProfileView address={userAddress} />
          ) : (
            <></>
          )}
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
