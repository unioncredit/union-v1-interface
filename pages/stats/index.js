import Head from "next/head";
import UnionTokenStatsView from "views/stats/UnionToken";

export default function StatsPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Union Token | Stats | Union</title>
        <meta property="og:title" content="Union Token | Stats | Union" />
        <meta name="twitter:title" content="Union Token | Stats | Union" />
      </Head>
      <UnionTokenStatsView />
    </div>
  );
}
