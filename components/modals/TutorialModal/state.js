import { newRidgeState } from "react-ridge-state";

const tutorialModalState = newRidgeState(false);

export function useTutorialModalOpen() {
  const state = tutorialModalState.useValue();

  return state;
}

export function useTutorialModalToggle() {
  const [state, setState] = tutorialModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
