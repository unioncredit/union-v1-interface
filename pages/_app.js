import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import Footer from "components/Footer";
import Navigation from "components/navigation";
import NetworkIndicator from "components/NetworkIndicator";
import useFathom from "hooks/useFathom";
import useNProgress from "hooks/useNProgress";
import getLibrary from "lib/getLibrary";
import { useEffect } from "react";
import "../styles/index.css";
import Error from "./_error";

export default function UnionApp({ Component, pageProps }) {
  useFathom();
  useNProgress();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("cookie-store");
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
