import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components-ui/ErrorBoundary";
import { Wrapper, Notifications } from "components-ui";
import useFathom from "hooks/useFathom";
import getLibrary from "lib/getLibrary";
import useGeoRestriction from "hooks/useGeoRestriction";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Error from "./_error";
import ErrorView from "views/error";
import { SWRConfig } from "swr";

import "../styles/index.css";
import { links } from "constants/app";

console.log(process.env.NEXT_PUBLIC_INFURA_KEY);

export default function UnionApp({ Component, pageProps }: AppProps) {
  useFathom();
  const restricted = useGeoRestriction();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieStore = require("cookie-store");
    }
  }, []);

  if (restricted) {
    return (
      <Wrapper>
        <ErrorView
          title="Access restricted"
          content="You’re accessing Union from the United States or another restricted jurisdiction. Unfortunately we are unable to grant access to the full Union experience."
          buttons={[
            {
              label: "Back to website",
              href: links.website,
              variant: "primary",
            },
            {
              label: "Join Discord Community",
              href: links.discord,
              variant: "secondary",
            },
          ]}
        />
      </Wrapper>
    );
  }

  return (
    <ErrorBoundary fallback={<Error />}>
      <SWRConfig
        value={{
          refreshInterval: 10 * 1000,
          errorRetryCount: 1,
        }}
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
          <Notifications />
        </Web3ReactProvider>
      </SWRConfig>
    </ErrorBoundary>
  );
}
