import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as Fathom from "fathom-client";
import { SWRConfig } from "swr";
import { Web3ReactProvider } from "@web3-react/core";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import App from "./App";
import { Notifications } from "components-ui";
import ErrorBoundary from "components-ui/ErrorBoundary";
import getLibrary from "lib/getLibrary";
import { networkAppUrlsProd } from "lib/connectors";
import UnsuportedChainProvider from "providers/UnsupportedChain";
import Error from "pages/error";

import "./index.scss";

const BrowserHistory = createBrowserHistory();

const domains = Object.values(networkAppUrlsProd).map((url) =>
  url.replace("https://", "")
);

const BrowserRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: ["*.union.finance", ...domains],
    });

    history.listen(({ action, location }) => {
      setState({ action, location });
      Fathom.trackPageview();
    });
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter history={BrowserHistory}>
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
