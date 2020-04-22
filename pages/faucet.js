import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import FaucetView from "views/faucet";
import LoggedOutView from "views/loggedOut";

export default function FaucetPage() {
  const { library, account } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Faucet | Union</title>
        <meta property="og:title" content="Faucet | Union" />
        <meta name="twitter:title" content="Faucet | Union" />
      </Head>

      {account && library ? <FaucetView /> : <LoggedOutView />}
    </div>
  );
}
