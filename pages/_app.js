import Navigation from "@components/navigation";
import ApplicationContext from "@contexts/Application";
import BorrowContext from "@contexts/Borrow";
import StakeContext from "@contexts/Stake";
import VouchContext from "@contexts/Vouch";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import Head from "next/head";
import "../css/tailwind.css";
import Footer from "@components/footer";

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
      <Head>
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
      </Head>

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
