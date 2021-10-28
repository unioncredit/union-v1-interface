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

export const addActivity = (chainId) => (activity) => {
  const getUpdatedState = (chainState, activity) => {
    if (!chainState) return [activity];
    if (chainState.length >= MAX_SIZE) {
      return [activity, ...chainState.slice(0, MAX_SIZE - 1)];
    }
    return [activity, ...chainState];
  };

  activityState.set((state) => {
    const chainState = state?.[chainId];
    const updatedChainState = getUpdatedState(chainState, activity);
    return { ...state, [chainId]: updatedChainState };
  });
};

export const clearActivity = (chainId) =>
  activityState.set((state) => ({ ...state, [chainId]: [] }));

export function useAddActivity() {
  const { chainId } = useWeb3React();
  return useAutoCallback(
    (activity) => chainId && addActivity(chainId)(activity)
  );
}

export default function useActivity() {
  const { chainId } = useWeb3React();
  const activity = activityState.useValue();

  useEffect(() => {
    if (!chainId) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(activityStorageKey, JSON.stringify(activity));
    }
  }, [activity, chainId]);

  return activity && chainId && activity[chainId];
}
