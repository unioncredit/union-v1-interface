import { newRidgeState } from "react-ridge-state";

const trustModalState = newRidgeState(false);

export function useTrustModalOpen() {
  const state = trustModalState.useValue();

  return state;
}

export function useTrustModalToggle() {
  const [state, setState] = trustModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
