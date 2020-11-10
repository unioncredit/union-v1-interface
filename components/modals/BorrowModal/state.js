import { newRidgeState } from "react-ridge-state";

const borrowModalState = newRidgeState(false);

export function useBorrowModalOpen() {
  const state = borrowModalState.useValue();

  return state;
}

export function useBorrowModalToggle() {
  const [state, setState] = borrowModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
