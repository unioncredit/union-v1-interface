import Footer from "@components/footer";
import Navigation from "@components/navigation";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";

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

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
          color: initial;
        }
      `}</style>
    </Web3ReactProvider>
  );
}
