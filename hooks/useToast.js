import cogoToast from "cogo-toast";
import { ToastBody, TOAST_ICONS } from "components/toasts";
import { Fragment, useCallback } from "react";
import getEtherscanLink from "util/getEtherscanLink";
import { useWeb3React } from "@web3-react/core";

const ToastContent = ({ message, hash }) => {
  const { chainId } = useWeb3React();

  if (hash)
    return (
      <Fragment>
        {message}
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
    );

  return message;
};

export const FLAVORS = {
  TX_WAITING: {
    body: "Waiting for confirmation",
    type: "loading",
    hideAfter: 0,
  },
  TX_PENDING: (hash) => ({
    body: <ToastContent message="Transaction is pending." hash={hash} />,
    type: "loading",
    hideAfter: 0,
  }),
  TX_PENDING_TOKEN: (hash) => ({
    body: <ToastContent message="Enabling token." hash={hash} />,
    type: "loading",
    hideAfter: 0,
  }),
  TX_SUCCESS: (hash) => ({
    body: <ToastContent message="Transaction successful." hash={hash} />,
    type: "success",
    hideAfter: 20,
  }),
  TX_SUCCESS_ENABLED: (hash) => ({
    body: <ToastContent message="Token enabled successfully." hash={hash} />,
    type: "success",
    hideAfter: 20,
  }),
  TX_ERROR: (message = "Transaction failed", hash) => ({
    body: <ToastContent message={message} hash={hash} />,
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
