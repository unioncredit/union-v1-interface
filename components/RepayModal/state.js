import { newRidgeState } from "react-ridge-state";

const repayModalState = newRidgeState(false);

export function useRepayModalOpen() {
  const state = repayModalState.useValue();

  return state;
}

export function useRepayModalToggle() {
  const [state, setState] = repayModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
