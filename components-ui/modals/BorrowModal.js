import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const BORROW_MODAL = "borrow-modal";

export const useBorrowModal = () => useModal(BORROW_MODAL);
	
export function BorrowModal() {
	const { close } = useBorrowModal();
	return (
		<ModalOverlay>
			<Modal title="Borrow funds" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}