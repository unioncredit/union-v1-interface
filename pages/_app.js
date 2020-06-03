import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import Footer from "components/footer";
import Navigation from "components/navigation";
import NetworkIndicator from "components/networkIndicator";
import StakeContext from "contexts/Stake";
import getLibrary from "lib/getLibrary";
import "../css/tailwind.css";
import Error from "./_error";

const ContextProviders = ({ children }) => (
  <StakeContext>{children}</StakeContext>
);

export default function UnionApp({ Component, pageProps }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ContextProviders>
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
        </ContextProviders>
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}
