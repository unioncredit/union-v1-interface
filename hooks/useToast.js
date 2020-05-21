import cogoToast from "cogo-toast";
import { ToastBody, TOAST_ICONS } from "components/toasts";
import { useCallback } from "react";

export const FLAVORS = {
  TX_WAITING: {
    body: "Waiting for confirmation",
    type: "loading",
    hideAfter: 0,
  },
  TX_PENDING: {
    body: "Transaction is pending",
    type: "loading",
    hideAfter: 0,
  },
  TX_SUCCESS: {
    body: "Transaction successful",
    type: "success",
  },
  TX_ERROR: (message = "Transaction failed") => ({
    body: message,
    type: "error",
    hideAfter: 20,
  }),
  LOGGED_OUT: {
    body: "You’ve succesfully logged out",
    type: "success",
  },
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
