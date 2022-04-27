import { useMemo } from "react";
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
  const ens = useENS(address);

  const userAddress = useMemo(() => {
    if (isAddress(address)) {
      return address;
    }
    return ens.address;
  }, [address, ens.address]);

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
