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
        html {
          box-sizing: border-box;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          padding: 0;
          margin: 0;
        }

        body {
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          text-decoration: none;
          color: initial;
        }
      `}</style>
    </Web3ReactProvider>
  );
}
