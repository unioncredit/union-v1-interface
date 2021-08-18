import { ModalOverlay, Modal } from "union-ui";
import { StakeCardContent } from "components-ui";
import { useModal } from "hooks/useModal";

export const STAKE_MODAL = "stake-modal";

export const useStakeModal = () => useModal(STAKE_MODAL);

export function StakeModal({ type }) {
  const { close } = useStakeModal();

  return (
    <ModalOverlay>
      <Modal title="Stake" onClose={close}>
        <Modal.Body>
          <StakeCardContent type={type} onComplete={close} />
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
