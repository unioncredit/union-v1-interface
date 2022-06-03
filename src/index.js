import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { Web3ReactProvider } from "@web3-react/core";
import ErrorBoundary from "components-ui/ErrorBoundary";
import { Notifications } from "components-ui";
import getLibrary from "lib/getLibrary";
import UnsuportedChainProvider from "providers/UnsupportedChain";
import Error from "pages/error";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UnsuportedChainProvider chainIds={[]}>
      <ErrorBoundary fallback={<Error />}>
        <SWRConfig
          value={{
            refreshInterval: 0,
            errorRetryCount: 0,
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: true,
            dedupingInterval: 5000,
          }}
        >
          <Web3ReactProvider getLibrary={getLibrary}>
            <App />
            <Notifications />
          </Web3ReactProvider>
        </SWRConfig>
      </ErrorBoundary>
    </UnsuportedChainProvider>
  </BrowserRouter>
);
