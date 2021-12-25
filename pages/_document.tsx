import Document, { Head, Html, Main, NextScript } from "next/document";

const META_TAGS = {
  DESCRIPTION:
    "Credit backed by trust. Union works without the need for collateral, credit score, or revealing personal information on a public ledger.",
};

export default class UnionDocument extends Document {
  render() {
    return (
      <Html lang="en" className="font-medium antialiased text-type-base">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta name="twitter:site" content="@unionprotocol" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@unionprotocol" />
          <meta
            name="description"
            key="description"
            content={META_TAGS.DESCRIPTION}
          />
          <meta
            property="og:description"
            key="og:description"
            content={META_TAGS.DESCRIPTION}
          />
          <meta
            name="twitter:description"
            key="twitter:description"
            content={META_TAGS.DESCRIPTION}
          />
          <meta
            key="og:image"
            property="og:image"
            content="https://app.union.finance/open-graph.png"
          />
          <meta
            key="twitter:image"
            property="twitter:image"
            content="https://app.union.finance/open-graph.png"
          />
          <meta name="theme-color" content="#032437" />
        </Head>
        <body className="hide-scrollbar">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
