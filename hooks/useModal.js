import { useModals } from "./useModals";

export const useModal = (modal) => {
	const { modals, toggleModal, openModal, closeModal } = useModals();

	return {
		isOpen: modals[modal],
		toggle: () => toggleModal(modal),
		open: () => openModal(modal),
		close: () => closeModal(modal),
	}
}