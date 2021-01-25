import Head from "next/head";
import MarketSettingsStatsView from "views/stats/marketSettings";

export default function MarketSettingsPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Market Settings | Stats | Union</title>
        <meta property="og:title" content="Market Settings | Stats | Union" />
        <meta name="twitter:title" content="Market Settings | Stats | Union" />
      </Head>
      <MarketSettingsStatsView />
    </div>
  );
}
