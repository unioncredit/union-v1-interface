import { useEffect } from "react";
import { newRidgeState } from "react-ridge-state";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";

const MAX_SIZE = 8;
const activityStorageKey = "union:activity";

const initialState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem(activityStorageKey))
    : {};

const activityState = newRidgeState(initialState);

export const addActivity = (chainId, address) => (activity) => {
  const key = [chainId, address].toString();

  const getUpdatedState = (stateSlice, activity) => {
    if (!stateSlice) return [activity];
    if (stateSlice.length >= MAX_SIZE) {
      return [activity, ...stateSlice.slice(0, MAX_SIZE - 1)];
    }
    return [activity, ...stateSlice];
  };

  activityState.set((state) => {
    const stateSlice = state?.[key];
    const updatedChainState = getUpdatedState(stateSlice, activity);
    return { ...state, [key]: updatedChainState };
  });
};

export const clearActivity = (chainId, address) => {
  const key = [chainId, address].toString();
  activityState.set((state) => ({ ...state, [key]: [] }));
};

export function useAddActivity() {
  const { chainId, account } = useWeb3React();
  return useAutoCallback(
    (activity) => chainId && addActivity(chainId, account)(activity)
  );
}

export function useClearActivity() {
  const { chainId, account } = useWeb3React();
  return useAutoCallback(() => chainId && clearActivity(chainId, account));
}

export default function useActivity() {
  const { chainId, account } = useWeb3React();
  const activity = activityState.useValue();

  useEffect(() => {
    if (!chainId) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(activityStorageKey, JSON.stringify(activity));
    }
  }, [activity, chainId]);

  return activity && chainId && activity[[chainId, account]];
}
