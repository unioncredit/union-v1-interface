import { newRidgeState } from "react-ridge-state";

const creditRequestModalState = newRidgeState(false);

export function useCreditRequestModalOpen() {
  const state = creditRequestModalState.useValue();

  return state;
}

export function useCreditRequestModalToggle() {
  const [state, setState] = creditRequestModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
