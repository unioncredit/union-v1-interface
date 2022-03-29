import Head from "next/head";
import { Layout } from "@unioncredit/ui";
import ErrorView from "views/error";

export default function Custom404Page() {
  return (
    <Layout>
      <Layout.Main>
        <Head>
          <title>404 | Union</title>
          <meta property="og:title" content="404 | Union" />
          <meta name="twitter:title" content="404 | Union" />
        </Head>

        <ErrorView
          title="This page doesn’t exist"
          content="Looks like you tried to access a URL that doesn’t exist. Use one of the helpful links below to return to safety."
        />
      </Layout.Main>
    </Layout>
  );
}
