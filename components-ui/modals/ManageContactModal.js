import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const MANAGE_CONTACT_MODAL = "manage-contact-modal";

export const useManageContactModal = () => useModal(MANAGE_CONTACT_MODAL);
	
export function ManageContactModal() {
	const { close } = useManageContactModal();
	return (
		<ModalOverlay>
			<Modal title="Manage contact" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}