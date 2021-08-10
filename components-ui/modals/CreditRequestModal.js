import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);
	
export function CreditRequestModal() {
	const { close } = useCreditRequestModal();
	return (
		<ModalOverlay>
			<Modal title="Credit Request" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}