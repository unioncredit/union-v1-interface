import { useCallback } from "react";
import { newRidgeState } from "react-ridge-state";

const initialState = [];

export const toastState = newRidgeState(initialState);

export const FLAVORS = {
  TX_PENDING: (hash, body) => ({
    body: body || "Transaction is pending.",
    hash,
    type: "pending",
    hideAfter: 0,
  }),
  TX_SUCCESS: (hash, body) => ({
    body: body || "Transaction successful.",
    hash,
    type: "success",
    hideAfter: 15,
  }),
  TX_ERROR: (message = "Transaction failed", hash) => ({
    body: message,
    hash,
    type: "error",
    hideAfter: 15,
  }),
  LOGGED_OUT: {
    body: "You’ve succesfully logged out",
    type: "success",
    hideAfter: 15,
  },
  SUCCESS: (message) => ({
    body: message,
    type: "success",
    hideAfter: 15,
  }),
  ERROR: (message) => ({
    body: message,
    type: "error",
    hideAfter: 15,
  }),
};

export const removeToast = (id) => {
  toastState.set((x) => x.filter((toast) => toast.id !== id));
};

export const addToast = (toast) => {
  let timer;

  toast.id = toastState.get().length ?? 0;

  toastState.set((x) => [...x, toast]);

  const hide = () => {
    clearTimeout(timer);
    removeToast(toast.id);
  };

  if (!isNaN(toast.hideAfter) && toast.hideAfter > 0) {
    timer = setTimeout(() => removeToast(toast.id), toast.hideAfter * 1000);
  }

  return { hide };
};

export default function useToast() {
  return useCallback(addToast, []);
}
