import ErrorBoundary from "@components/errorBoundary";
import Footer from "@components/footer";
import Navigation from "@components/navigation";
import ApplicationContext from "@contexts/Application";
import BorrowContext from "@contexts/Borrow";
import StakeContext from "@contexts/Stake";
import VouchContext from "@contexts/Vouch";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import "../css/tailwind.css";
import Error from "./_error";

const ContextProviders = ({ children }) => (
  <ApplicationContext>
    <BorrowContext>
      <VouchContext>
        <StakeContext>{children}</StakeContext>
      </VouchContext>
    </BorrowContext>
  </ApplicationContext>
);

export default function UnionApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContextProviders>
        <header>
          <Navigation />
        </header>

        <main>
          <ErrorBoundary fallback={<Error />}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </main>

        <Footer />
      </ContextProviders>
    </Web3ReactProvider>
  );
}
