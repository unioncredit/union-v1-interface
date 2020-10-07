import GovernanceNavigation from "components/GovernanceNavigation";
import Head from "next/head";
import GovernanceView from "views/governance/governance";

export default function GovernancePage() {
  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Governance | Union</title>
        <meta property="og:title" content="Governance | Union" />
        <meta name="twitter:title" content="Governance | Union" />
      </Head>

      <div className="container">
        <h1 hidden>Governance</h1>

        <nav className="pt-6">
          <GovernanceNavigation />
        </nav>
      </div>

      <GovernanceView />
    </div>
  );
}
