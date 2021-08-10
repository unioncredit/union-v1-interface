import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const VOTE_DELEGATION_MODAL = "vote-delegation-modal";

export const useVoteDelegationModal = () => useModal(VOTE_DELEGATION_MODAL);
	
export function VoteDelegationModal() {
	const { close } = useVoteDelegationModal();
	return (
		<ModalOverlay>
			<Modal title="Delegate votes" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}