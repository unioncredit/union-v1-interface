import { useWeb3React } from "@web3-react/core";
import TicketGate from "components/TicketGate";
import Head from "next/head";
import BorrowView from "views/borrow";
import LoggedOutView from "views/loggedOut";

export default function BorrowPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Borrow | Union</title>
        <meta property="og:title" content="Borrow | Union" />
        <meta name="twitter:title" content="Borrow | Union" />
      </Head>

      {account && library ? (
        <TicketGate>
          <BorrowView />
        </TicketGate>
      ) : (
        <LoggedOutView />
      )}
    </div>
  );
}
