import cogoToast from "cogo-toast";
import { ToastBody, ToastContent, TOAST_ICONS } from "components/toasts";
import { useCallback } from "react";

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

/**
 * @name addToast
 *
 * @param {Object} options
 * @param {any} options.body
 * @param {("success"|"info"|"loading"|"warn"|"error")} options.type
 * @param {Number} options.hideAfter
 */
export const addToast = ({ body, type = "success", hideAfter = 6 }) => {
  const { hide } = cogoToast[type](
    <ToastBody body={body} onDismiss={() => hide()} />,
    {
      renderIcon: TOAST_ICONS[type],
      position: "bottom-right",
      hideAfter,
      bar: {
        size: "1px",
        style: "solid",
        color: "#f3f4f7",
      },
    }
  );

  return { hide };
};

export default function useToast() {
  return useCallback(addToast, []);
}
