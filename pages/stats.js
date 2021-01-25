import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import StatsView from "views/stats";

export default function StatsPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Stats | Union</title>
        <meta property="og:title" content="Stats | Union" />
        <meta name="twitter:title" content="Stats | Union" />
      </Head>

      {account && library ? <StatsView /> : <LoggedOutView />}
    </div>
  );
}
