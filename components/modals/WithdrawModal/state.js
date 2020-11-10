import { newRidgeState } from "react-ridge-state";

const withdrawModalState = newRidgeState(false);

export function useWithdrawModalOpen() {
  const state = withdrawModalState.useValue();

  return state;
}

export function useWithdrawModalToggle() {
  const [state, setState] = withdrawModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
