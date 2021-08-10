import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);
	
export function VouchModal() {
	const { close } = useVouchModal();
	return (
		<ModalOverlay>
			<Modal title="Vouch for someone" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}