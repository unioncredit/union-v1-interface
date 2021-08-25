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
          <link rel="icon" href="/favicon.png" />
          <meta property="og:type" content="website" />
          <meta
            name="twitter:image"
            content="https://union.finance/og-image.png"
          />
          <meta name="og:image" content="https://union.finance/og-image.png" />
          <meta name="twitter:site" content="@unionprotocol" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@unionprotocol" />
          <meta name="description" content={META_TAGS.DESCRIPTION} />
          <meta property="og:description" content={META_TAGS.DESCRIPTION} />
          <meta name="twitter:description" content={META_TAGS.DESCRIPTION} />
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
