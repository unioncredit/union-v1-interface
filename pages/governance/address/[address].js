import Head from "next/head";
import AddressView from "views/governance/address";

export default function AddressPage() {
  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Profile | Union</title>
        <meta property="og:title" content="Profile | Union" />
        <meta name="twitter:title" content="Profile | Union" />
      </Head>

      <h1 hidden>Profile</h1>

      <AddressView />
    </div>
  );
}