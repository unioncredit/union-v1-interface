import { newRidgeState } from "react-ridge-state";

const emailModalState = newRidgeState(false);

export function useEmailModalOpen() {
  const state = emailModalState.useValue();

  return state;
}

export function useEmailModalToggle() {
  const [state, setState] = emailModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
