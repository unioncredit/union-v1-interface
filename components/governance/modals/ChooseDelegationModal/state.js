import { newRidgeState } from "react-ridge-state";

const chooseDelegationModalState = newRidgeState(false);

export function useChooseDelegationModalOpen() {
  const state = chooseDelegationModalState.useValue();

  return state;
}

export function useChooseDelegationModalToggle() {
  const [state, setState] = chooseDelegationModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
