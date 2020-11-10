import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import AdminView from "views/administrator";
import LoggedOutView from "views/loggedOut";

export default function AdministratorPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Admin | Union</title>
        <meta property="og:title" content="Admin | Union" />
        <meta name="twitter:title" content="Admin | Union" />
      </Head>

      {account && library ? <AdminView /> : <LoggedOutView />}
    </div>
  );
}
