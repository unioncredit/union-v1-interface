import { newRidgeState } from "react-ridge-state";

const depositModalState = newRidgeState(false);

export function useDepositModalOpen() {
  const state = depositModalState.useValue();

  return state;
}

export function useDepositModalToggle() {
  const [state, setState] = depositModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
