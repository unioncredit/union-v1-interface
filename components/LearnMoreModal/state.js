import { newRidgeState } from "react-ridge-state";

const learnMoreModalState = newRidgeState(false);

export function useLearnMoreModalOpen() {
  const state = learnMoreModalState.useValue();

  return state;
}

export function useLearnMoreModalToggle() {
  const [state, setState] = learnMoreModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
