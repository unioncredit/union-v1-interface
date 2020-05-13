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
      <%- if environment? :production %>
      <script type="text/javascript">
      window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
    heap.load("3604841211");
    </script>
    <%- end %>
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
