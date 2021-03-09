import Head from "next/head";
import AssetManagerStatsView from "views/stats/assetManager";

export default function AssetManagerPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Asset Manager | Stats | Union</title>
        <meta property="og:title" content="Asset Manager | Stats | Union" />
        <meta name="twitter:title" content="Asset Manager | Stats | Union" />
      </Head>
      <AssetManagerStatsView />
    </div>
  );
}
