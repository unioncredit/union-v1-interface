import { newRidgeState } from "react-ridge-state";

const delegatedModalState = newRidgeState(false);

export function useDelegatedModalOpen() {
  const state = delegatedModalState.useValue();

  return state;
}

export function useDelegatedModalToggle() {
  const [state, setState] = delegatedModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
