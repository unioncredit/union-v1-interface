import { HOTJAR_APP_ID } from "lib/hotjar";
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
            href="/Montserrat-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/Montserrat-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/Montserrat-600.woff2"
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
          {/* Hotjar Tracking Code */}
          <script
          (function(h,o,t,j,a,r){
             h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
             h._hjSettings={hjid:1828776,hjsv:6};
             a=o.getElementsByTagName('head')[0];
             r=o.createElement('script');r.async=1;
             r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
             a.appendChild(r);
             })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          />
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
