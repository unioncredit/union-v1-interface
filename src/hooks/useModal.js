import { modalState, useModals } from "./useModals";

export const useModal = (modal) => {
  const { toggleModal, openModal, closeModal } = useModals();

  return {
    toggle: () => toggleModal(modal),
    open: () => openModal(modal),
    close: () => closeModal(modal),
  };
};

export const useModalOpen = (modal) => {
  return modalState.useSelector((modals) => modals[modal]);
};
