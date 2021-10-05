import { ModalOverlay } from "union-ui";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import { RewardsCardContent } from "components-ui";

export const WALLET_MODAL = "wallet-modal";

export const useWalletModal = () => useModal(WALLET_MODAL);

export function WalletModal() {
  const { close } = useWalletModal();

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Wallet" onClose={close}>
        <Modal.Body>
          <RewardsCardContent />
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
