import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const WALLET_MODAL = "wallet-modal";

export const useWalletModal = () => useModal(WALLET_MODAL);
	
export function WalletModal() {
	const { close } = useWalletModal();
	return (
		<ModalOverlay>
			<Modal title="Wallet" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}