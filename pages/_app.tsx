import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import Footer from "components/Footer";
import Navigation from "components/Navigation";
import NetworkIndicator from "components/NetworkIndicator";
import getLibrary from "lib/getLibrary";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/index.css";
import Error from "./_error";

export default function UnionApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieStore = require("cookie-store");
    }
  }, []);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="flex flex-col min-h-screen">
          <NetworkIndicator />

          <header>
            <Navigation />
          </header>

          <main className="flex-1">
            <Component {...pageProps} />
          </main>

          <Footer />
        </div>
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}
