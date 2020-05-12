import cogoToast from "cogo-toast";
import { ToastBody, TOAST_ICONS } from "components/toasts";
import { useCallback } from "react";

export default function useToast() {
  const addToast = useCallback(
    /**
     * @name addToast
     * @param {any} body
     * @param {Object} options
     * @param {("success"|"info"|"loading"|"warn"|"error")} options.type
     * @param {Number} options.hideAfter
     */
    (body, { type = "success", hideAfter = 6 }) => {
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
    },
    []
  );

  return addToast;
}
