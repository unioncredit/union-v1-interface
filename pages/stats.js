import Head from "next/head";
import StatsView from "views/governance/statistics";

export default function StatisticsPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Stats | Union</title>
        <meta property="og:title" content="Stats | Union" />
        <meta name="twitter:title" content="Stats | Union" />
      </Head>

      <StatsView />
    </div>
  );
}
