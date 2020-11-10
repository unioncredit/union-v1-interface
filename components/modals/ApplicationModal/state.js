import { newRidgeState } from "react-ridge-state";

const applicationModalState = newRidgeState(false);

export function useApplicationModalOpen() {
  const state = applicationModalState.useValue();

  return state;
}

export function useApplicationModalToggle() {
  const [state, setState] = applicationModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
