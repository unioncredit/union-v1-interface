import { useEffect } from "react";
import { newRidgeState } from "react-ridge-state";

const MAX_SIZE = 8;
const activityStorageKey = "union:activity";

const initialState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem(activityStorageKey))
    : [];

const activityState = newRidgeState(initialState || []);

export const addActivity = (activity) => {
  activityState.set((x) => {
    if (x.length >= MAX_SIZE) {
      return [activity, ...x.slice(0, MAX_SIZE - 1)];
    }
    return [activity, ...x];
  });
};

export const clearActivity = () => activityState.set([]);

export default function useActivity() {
  const activity = activityState.useValue();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(activityStorageKey, JSON.stringify(activity));
    }
  }, [activity]);

  return activity;
}
