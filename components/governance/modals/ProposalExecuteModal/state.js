import { newRidgeState } from "react-ridge-state";

const ProposalExecuteModalState = newRidgeState(false);

export function useProposalExecuteModalOpen() {
  const state = ProposalExecuteModalState.useValue();

  return state;
}

export function useProposalExecuteModalToggle() {
  const [state, setState] = ProposalExecuteModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
