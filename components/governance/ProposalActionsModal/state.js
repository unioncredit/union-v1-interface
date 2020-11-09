import { newRidgeState } from "react-ridge-state";

const proposalActionsModalState = newRidgeState(false);

export function useProposalActionsModalOpen() {
  const state = proposalActionsModalState.useValue();

  return state;
}

export function useProposalActionsModalToggle() {
  const [state, setState] = proposalActionsModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
