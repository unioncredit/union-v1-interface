import { newRidgeState } from "react-ridge-state";

const proposalModalState = newRidgeState(false);

export function useProposalModalOpen() {
  const state = proposalModalState.useValue();

  return state;
}

export function useProposalModalToggle() {
  const [state, setState] = proposalModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
