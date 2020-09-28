import Head from "next/head";
import GovernanceView from "views/governance";

export default function GovernancePage() {
  return (
    <div className="gradient-governance">
      <Head>
        <title>Governance | Union</title>
        <meta property="og:title" content="Governance | Union" />
        <meta name="twitter:title" content="Governance | Union" />
      </Head>

      <GovernanceView />
    </div>
  );
}
