import Head from "next/head";
import ProposalsView from "views/proposals";

export default function ProposalsPage() {
  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Proposals | Union</title>
        <meta property="og:title" content="Proposals | Union" />
        <meta name="twitter:title" content="Proposals | Union" />
      </Head>

      <ProposalsView />
    </div>
  );
}
