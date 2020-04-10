import Footer from "@components/footer";
import Navigation from "@components/navigation";
import ApplicationContext from "@contexts/Application";
import BorrowContext from "@contexts/Borrow";
import StakeContext from "@contexts/Stake";
import VouchContext from "@contexts/Vouch";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import "../css/tailwind.css";

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
          <Component {...pageProps} />
        </main>

        <Footer />
      </ContextProviders>
    </Web3ReactProvider>
  );
}
