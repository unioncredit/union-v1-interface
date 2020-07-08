import { useWeb3React } from "@web3-react/core";
import TicketGate from "components/TicketGate";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import StakeView from "views/stake";

export default function StakePage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Stake | Union</title>
        <meta property="og:title" content="Stake | Union" />
        <meta name="twitter:title" content="Stake | Union" />
      </Head>

      {account && library ? (
        <TicketGate>
          <StakeView />
        </TicketGate>
      ) : (
        <LoggedOutView />
      )}
    </div>
  );
}
