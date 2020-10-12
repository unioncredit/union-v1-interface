import { newRidgeState } from "react-ridge-state";

const ProposalVoteModalState = newRidgeState(false);

export function useProposalVoteModalOpen() {
  const state = ProposalVoteModalState.useValue();

  return state;
}

export function useProposalVoteModalToggle() {
  const [state, setState] = ProposalVoteModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
