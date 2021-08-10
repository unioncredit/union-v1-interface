import { newRidgeState } from "react-ridge-state";

const initialState = {};

export const modalState = newRidgeState(initialState);

export function useModals() {
	const [modals, setModals] = modalState.use();

	const updateModal = (modal, open) => {
		setModals(x => ({...x, [modal]: open }));
	}

	const toggleModal = (modal) => {
		setModals(x => ({...x, [modal]: !x[modal]}));
	}

	const openModal = (modal) => updateModal(modal, true);

	const closeModal = (modal) => updateModal(modal, false);

	return { modals, toggleModal, openModal, closeModal };
}