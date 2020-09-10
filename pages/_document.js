import Document, { Head, Html, Main, NextScript } from "next/document";

const META_TAGS = {
  DESCRIPTION:
    "Credit backed by trust. Union works without the need for collateral, credit score, or revealing personal information on a public ledger.",
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="font-medium antialiased text-type-base">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            rel="preload"
            href="/fonts/Montserrat-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat-600.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-Inter-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
