import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const PAYMENT_MODAL = "payment-modal";

export const usePaymentModal = () => useModal(PAYMENT_MODAL);
	
export function PaymentModal() {
	const { close } = usePaymentModal();
	return (
		<ModalOverlay>
			<Modal title="Make a payment" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}