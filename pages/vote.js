import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import VoteView from "views/vote";

export default function VotePage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Vote | Union</title>
        <meta property="og:title" content="Vote | Union" />
        <meta name="twitter:title" content="Vote | Union" />
      </Head>

      {account && library ? <VoteView /> : <LoggedOutView />}
    </div>
  );
}
