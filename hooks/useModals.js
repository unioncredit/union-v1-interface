import { newRidgeState } from "react-ridge-state";

const initialState = {};

export const modalState = newRidgeState(initialState);

export function useModals() {
  const updateModal = (modal, open) => {
    modalState.set((x) => ({ ...x, [modal]: open }));
  };

  const toggleModal = (modal) => {
    modalState.set((x) => ({ ...x, [modal]: !x[modal] }));
  };

  const openModal = (modal) => updateModal(modal, true);

  const closeModal = (modal) => updateModal(modal, false);

  return { toggleModal, openModal, closeModal };
}

