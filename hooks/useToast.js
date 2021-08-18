import { useRef, useCallback } from "react";
import { newRidgeState } from "react-ridge-state";

const initialState = [];

export const toastState = newRidgeState(initialState);

export const FLAVORS = {
  TX_WAITING: {
    body: "Waiting for confirmation",
    type: "pending",
    hideAfter: 0,
  },
  TX_PENDING: (hash) => ({
    body: "Transaction is pending.",
    hash,
    type: "pending",
    hideAfter: 0,
  }),
  TX_PENDING_TOKEN: (hash) => ({
    body: "Enabling token.",
    hash,
    type: "pending",
    hideAfter: 0,
  }),
  TX_SUCCESS: (hash) => ({
    body: "Transaction successful.",
    hash,
    type: "success",
    hideAfter: 20,
  }),
  TX_SUCCESS_ENABLED: (hash) => ({
    body: "Token enabled successfully.",
    hash,
    type: "success",
    hideAfter: 20,
  }),
  TX_ERROR: (message = "Transaction failed", hash) => ({
    body: message,
    hash,
    type: "error",
    hideAfter: 20,
  }),
  LOGGED_OUT: {
    body: "You’ve succesfully logged out",
    type: "success",
  },
  WALLET_ERROR: (message) => ({
    body: message,
    type: "error",
    hideAfter: 20,
  }),
  SUCCESS: (message) => ({
    body: message,
    type: "success",
    hideAfter: 20,
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
