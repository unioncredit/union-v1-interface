import { useEffect } from "react";

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
  const { close } = useModal(modal);

  useEffect(() => () => close(), []);

  return modalState.useSelector((modals) => modals[modal]);
};
