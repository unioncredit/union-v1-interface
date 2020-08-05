import cogoToast from "cogo-toast";
import { ToastBody, TOAST_ICONS } from "components/toasts";
import { Fragment, useCallback } from "react";
import getEtherscanLink from "util/getEtherscanLink";

export const FLAVORS = {
  TX_WAITING: {
    body: "Waiting for confirmation",
    type: "loading",
    hideAfter: 0,
  },
  TX_PENDING: (hash, chainId) => ({
    body: (
      <Fragment>
        Transaction is pending.
        {hash && chainId && (
          <Fragment>
            <br />
            <a
              className="underline"
              href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </Fragment>
        )}
      </Fragment>
    ),
    type: "loading",
    hideAfter: 0,
  }),
  TX_PENDING_TOKEN: (hash, chainId) => ({
    body: (
      <Fragment>
        Enabling token.
        {hash && chainId && (
          <Fragment>
            <br />
            <a
              className="underline"
              href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </Fragment>
        )}
      </Fragment>
    ),
    type: "loading",
    hideAfter: 0,
  }),
  TX_SUCCESS: (hash, chainId) => ({
    body: (
      <Fragment>
        Transaction successful.
        {hash && chainId && (
          <Fragment>
            <br />
            <a
              className="underline"
              href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </Fragment>
        )}
      </Fragment>
    ),
    type: "success",
    hideAfter: 20,
  }),
  TX_SUCCESS_ENABLED: (hash, chainId) => ({
    body: (
      <Fragment>
        Token enabled successfully.
        {hash && chainId && (
          <Fragment>
            <br />
            <a
              className="underline"
              href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </Fragment>
        )}
      </Fragment>
    ),
    type: "success",
    hideAfter: 20,
  }),
  TX_ERROR: (message = "Transaction failed", hash, chainId) => ({
    body: (
      <Fragment>
        {message}

        {hash && chainId && (
          <Fragment>
            <br />
            <a
              className="underline"
              href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </Fragment>
        )}
      </Fragment>
    ),
    type: "error",
    hideAfter: 20,
  }),
  LOGGED_OUT: {
    body: "You’ve succesfully logged out",
    type: "success",
  },
  WALLET_ERROR: (message) => ({
    body: message,
    type: "warn",
    hideAfter: 20,
  }),
};

export default function useToast() {
  const addToast = useCallback(
    /**
     * @name addToast
     * @param {Object} options
     * @param {any} options.body
     * @param {("success"|"info"|"loading"|"warn"|"error")} options.type
     * @param {Number} options.hideAfter
     */
    ({ body, type = "success", hideAfter = 6 }) => {
      const { hide } = cogoToast[type](
        <ToastBody body={body} onDismiss={() => hide()} />,
        {
          position: "bottom-right",
          bar: {
            size: "1px",
            style: "solid",
            color: "#f3f4f7",
          },
          hideAfter,
          renderIcon: TOAST_ICONS[type],
        }
      );

      return { hide };
    },
    []
  );

  return addToast;
}
