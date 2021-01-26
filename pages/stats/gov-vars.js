import Head from "next/head";
import GovernanceStatsView from "views/stats/governance";

export default function GovernancePage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Governance | Stats | Union</title>
        <meta property="og:title" content="Governance | Stats | Union" />
        <meta name="twitter:title" content="Governance | Stats | Union" />
      </Head>
      <GovernanceStatsView />
    </div>
  );
}
