import Head from "next/head";
import UTokenStatsView from "views/stats/uToken";

export default function UTokenPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>UToken | Stats | Union</title>
        <meta property="og:title" content="UToken | Stats | Union" />
        <meta name="twitter:title" content="UToken | Stats | Union" />
      </Head>
      <UTokenStatsView />
    </div>
  );
}
