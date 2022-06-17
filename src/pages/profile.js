import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { isAddress } from "@ethersproject/address";

import { PageHead } from "components-ui";
import ProfileView from "views/profile";
import LoggedOutView from "views/loggedOut";
import useENS from "hooks/useENS";
import { useForceConnect } from "hooks/useForceConnect";

const API_URL = "https://api.union.finance/api";

export default function ProfilePage() {
  const [forceConnect] = useForceConnect();
  const { address } = useParams();
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
      <Helmet>
        <meta
          key="og:image"
          property="og:image"
          content={`${API_URL}/profile?address=${userAddress}`}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={`${API_URL}/profile?address=${userAddress}`}
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content={`Union Member ${userAddress}`}
        />
      </Helmet>

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
