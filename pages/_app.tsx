import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import Footer from "components/Footer";
import useFathom from "hooks/useFathom";
import getLibrary from "lib/getLibrary";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/index.css";
import Error from "./_error";

export default function UnionApp({ Component, pageProps }: AppProps) {
  useFathom();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieStore = require("cookie-store");
    }
  }, []);

  console.log({ pageProps });

  return (
    <ErrorBoundary fallback={<Error />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}
