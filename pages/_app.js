import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import Footer from "components/footer";
import Navigation from "components/navigation";
import NetworkIndicator from "components/networkIndicator";
import useFathom from "hooks/useFathom";
import getLibrary from "lib/getLibrary";
import "../styles/index.css";
import Error from "./_error";

export default function UnionApp({ Component, pageProps }) {
  useFathom();

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
