import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);
	
export function AccountModal() {
	const { close } = useAccountModal();
	return (
		<ModalOverlay>
			<Modal title="Account" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}