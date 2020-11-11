import { newRidgeState } from "react-ridge-state";

const createProposalModalState = newRidgeState(false);

export function useCreateProposalModalOpen() {
  const state = createProposalModalState.useValue();

  return state;
}

export function useCreateProposalModalToggle() {
  const [state, setState] = createProposalModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}
