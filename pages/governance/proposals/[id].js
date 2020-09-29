import Head from "next/head";
import ProposalView from "views/proposal";

export default function ProposalPage() {
  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Proposal | Union</title>
        <meta property="og:title" content="Proposal | Union" />
        <meta name="twitter:title" content="Proposal | Union" />
      </Head>

      <ProposalView />
    </div>
  );
}
