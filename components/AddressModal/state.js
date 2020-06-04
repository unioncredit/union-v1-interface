import { newRidgeState } from "react-ridge-state";

const addressModalState = newRidgeState(false);

export function useAddressModalOpen() {
  const state = addressModalState.useValue();

  return state;
}

export function useAddressModalToggle() {
  const [state, setState] = addressModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
