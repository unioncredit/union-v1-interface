import { modalState, useModals } from "./useModals";

export const useModal = (modal) => {
  const { toggleModal, openModal, closeModal } = useModals();

  const isOpen = modalState.useSelector((modals) => modals[modal]);

  return {
    isOpen,
    toggle: () => toggleModal(modal),
    open: () => openModal(modal),
    close: () => closeModal(modal),
  };
};
