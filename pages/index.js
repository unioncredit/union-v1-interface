import Head from "next/head";
import HomeView from "views/home";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Union</title>
        <meta property="og:title" content="Union" />
        <meta name="twitter:title" content="Union" />
      </Head>

      <HomeView />
    </div>
  );
}
