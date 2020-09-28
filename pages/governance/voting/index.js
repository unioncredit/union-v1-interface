import { useWeb3React } from "@web3-react/core";
import GovernanceNavigation from "components/GovernanceNavigation";
import Head from "next/head";
import LoggedOutView from "views/loggedOut";
import VotingView from "views/voting";

export default function GovernanceVotingPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Voting | Union</title>
        <meta property="og:title" content="Voting | Union" />
        <meta name="twitter:title" content="Voting | Union" />
      </Head>

      <div className="container">
        <h1 hidden>Voting</h1>

        <nav className="pt-6">
          <GovernanceNavigation />
        </nav>
      </div>

      {account && library ? (
        <VotingView />
      ) : (
        <section className="pt-16">
          <LoggedOutView />
        </section>
      )}
    </div>
  );
}
