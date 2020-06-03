import { newRidgeState } from "react-ridge-state";

const managerModalState = newRidgeState(false);

export function useManagerModalOpen() {
  const state = managerModalState.useValue();

  return state;
}

export function useManagerModalToggle() {
  const [state, setState] = managerModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
