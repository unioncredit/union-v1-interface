import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import MemberView from "views/member";

export default function MemberPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Member | Union</title>
        <meta property="og:title" content="Member | Union" />
        <meta name="twitter:title" content="Member | Union" />
      </Head>

      {account && library ? <MemberView /> : <LoggedOutView />}
    </div>
  );
}
