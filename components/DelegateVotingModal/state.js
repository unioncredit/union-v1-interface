import { newRidgeState } from "react-ridge-state";

const delegateVotingModalState = newRidgeState(false);

export function useDelegateVotingModalOpen() {
  const state = delegateVotingModalState.useValue();

  return state;
}

export function useDelegateVotingModalToggle() {
  const [state, setState] = delegateVotingModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
