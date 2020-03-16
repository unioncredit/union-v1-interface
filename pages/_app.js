import Footer from "@components/footer";
import Navigation from "@components/navigation";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import "../css/tailwind.css";

export default function UnionApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <header>
        <Navigation />
      </header>

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </Web3ReactProvider>
  );
}
