import { useState, useEffect } from "react";

export default function usePersistentState(key, initialValue) {
  const initialState =
    typeof window === "undefined"
      ? initialValue
      : JSON.parse(window.localStorage.getItem(key)) || initialValue;

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!state) return;
    const encoded = JSON.stringify(state);
    window.localStorage.setItem(key, encoded);
  }, [state]);

  return [state, setState];
}
