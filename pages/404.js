import Head from "next/head";
import Button from "components/button";

export default function Custom404Page() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>404 | Union</title>
        <meta property="og:title" content="404 | Union" />
        <meta name="twitter:title" content="404 | Union" />
      </Head>

      <div className="container">
        <div className="text-center pt-32 pb-64">
          <h1>This page doesn’t exist</h1>
          <p className="text-lg mt-4">
            You might have mistyped the address, or the page might have moved.
          </p>
          <div className="mt-4">
            <Button href="/stake">Take me Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
