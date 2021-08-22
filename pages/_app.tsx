import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components/errorBoundary";
import { Notifications } from "components-ui";
import useFathom from "hooks/useFathom";
import getLibrary from "lib/getLibrary";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/index.css";
import "../styles/home.css";
import { setGridConfiguration } from "union-ui";
import Error from "./_error";

setGridConfiguration({
  breakpoints: [600, 850, 1250, 1400, 1600],
  containerWidths: [740, 740, 960, 1140, 1540],
});

export default function UnionApp({ Component, pageProps }: AppProps) {
  useFathom();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieStore = require("cookie-store");
    }
  }, []);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
        <Notifications />
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}
