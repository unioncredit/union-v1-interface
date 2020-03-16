import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "@lib/getLibrary";

export default function UnionApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
