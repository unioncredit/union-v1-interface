import { newRidgeState } from "react-ridge-state";

const ProposalQueueModalState = newRidgeState(false);

export function useProposalQueueModalOpen() {
  const state = ProposalQueueModalState.useValue();

  return state;
}

export function useProposalQueueModalToggle() {
  const [state, setState] = ProposalQueueModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
