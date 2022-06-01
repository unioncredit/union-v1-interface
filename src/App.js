import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components-ui/ErrorBoundary";
import { Wrapper, Notifications } from "components-ui";
import getLibrary from "lib/getLibrary";
import useGeoRestriction from "hooks/useGeoRestriction";
import Error from "./pages/error";
import ErrorView from "views/error";
import UnsuportedChainProvider from "providers/UnsupportedChain";
import { links } from "constants/app";

import Credit from "pages/credit";
import Stake from "pages/stake";

import "./index.css";

function App() {
  const restricted = useGeoRestriction();

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
    <BrowserRouter>
      <UnsuportedChainProvider chainIds={[]}>
        <ErrorBoundary fallback={<Error />}>
          <SWRConfig
            value={{
              refreshInterval: 0,
              errorRetryCount: 0,
              shouldRetryOnError: false,
              revalidateOnFocus: true,
              revalidateOnReconnect: false,
              revalidateOnMount: true,
              dedupingInterval: 5000,
            }}
          >
            <Web3ReactProvider getLibrary={getLibrary}>
              <Wrapper>
                <Routes>
                  <Route path="/credit" element={<Credit />} />
                  <Route path="/stake" element={<Stake />} />
                </Routes>
              </Wrapper>
              <Notifications />
            </Web3ReactProvider>
          </SWRConfig>
        </ErrorBoundary>
      </UnsuportedChainProvider>
    </BrowserRouter>
  );
}

export default App;
