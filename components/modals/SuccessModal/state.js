import { newRidgeState } from "react-ridge-state";

const successModalState = newRidgeState(false);

export function useSuccessModalOpen() {
  const state = successModalState.useValue();

  return state;
}

export function useSuccessModalToggle() {
  const [state, setState] = successModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
