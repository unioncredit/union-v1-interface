import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components-ui/ErrorBoundary";
import { Wrapper, Notifications } from "components-ui";
import useFathom from "hooks/useFathom";
import getLibrary from "lib/getLibrary";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Error from "./_error";

import "../styles/index.css";

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
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Notifications />
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}
