import Head from "next/head";
import WaitlistView from "views/waitlist";

export default function WaitlistPage() {
  return (
    <div className="hero-gradient">
      <Head>
        <title>Waitlist | Union</title>
        <meta property="og:title" content="Waitlist | Union" />
        <meta name="twitter:title" content="Waitlist | Union" />
      </Head>

      <WaitlistView />
    </div>
  );
}
