import Head from "next/head";
import ErrorView from "views/error";

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Union</title>
        <meta property="og:title" content="Union" />
        <meta name="twitter:title" content="Union" />
      </Head>

      <ErrorView />
    </div>
  );
}
