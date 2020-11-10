import { newRidgeState } from "react-ridge-state";

const marketModalState = newRidgeState(false);

export function useMarketModalOpen() {
  const state = marketModalState.useValue();

  return state;
}

export function useMarketModalToggle() {
  const [state, setState] = marketModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
