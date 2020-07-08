import { useWeb3React } from "@web3-react/core";
import TicketGate from "components/TicketGate";
import Head from "next/head";
import AccountView from "views/account";
import LoggedOutView from "views/loggedOut";

export default function AccountPage() {
  const { library, account } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Account | Union</title>
        <meta property="og:title" content="Account | Union" />
        <meta name="twitter:title" content="Account | Union" />
      </Head>

      {account && library ? (
        <TicketGate>
          <AccountView />
        </TicketGate>
      ) : (
        <LoggedOutView />
      )}
    </div>
  );
}
