import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import VouchView from "views/vouch";

export default function VouchPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Vouch | Union</title>
        <meta property="og:title" content="Vouch | Union" />
        <meta name="twitter:title" content="Vouch | Union" />
      </Head>

      {account && library ? <VouchView /> : <LoggedOutView />}
    </div>
  );
}
