import { newRidgeState } from "react-ridge-state";

const getInvitedModalState = newRidgeState(false);

export function useGetInvitedModalOpen() {
  const state = getInvitedModalState.useValue();

  return state;
}

export function useGetInvitedModalToggle() {
  const [state, setState] = getInvitedModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
