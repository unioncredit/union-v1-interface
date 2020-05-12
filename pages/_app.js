import Footer from "components/footer";
import Navigation from "components/navigation";
import NetworkIndicator from "components/networkIndicator";
import ApplicationContext, {
  Updater as ApplicationContextUpdater,
} from "contexts/Application";
import BorrowContext from "contexts/Borrow";
import StakeContext from "contexts/Stake";
import VouchContext from "contexts/Vouch";
import AdminContext from "contexts/Admin";
import getLibrary from "lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import "../css/tailwind.css";
import ErrorBoundary from "components/errorBoundary";
import Error from "./_error";
import { Fragment } from "react";

const ContextProviders = ({ children }) => (
  <ApplicationContext>
    <BorrowContext>
      <VouchContext>
        <StakeContext>
          <AdminContext>{children}</AdminContext>
        </StakeContext>
      </VouchContext>
    </BorrowContext>
  </ApplicationContext>
);

const Updaters = () => (
  <Fragment>
    <ApplicationContextUpdater />
  </Fragment>
);

export default function UnionApp({ Component, pageProps }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ContextProviders>
          <Updaters />
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
