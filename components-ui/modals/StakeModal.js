import { newRidgeState } from "react-ridge-state";
import { ModalOverlay } from "union-ui";
import { StakeCardContent, Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import { useCallback } from "react";

export const STAKE_MODAL = "stake-modal";

export const modalStakeType = newRidgeState("deposit");

export const useStakeModal = () => {
  const type = modalStakeType.useValue();
  const { open, ...props } = useModal(STAKE_MODAL);

  const handleOpenModal = useCallback(
    (stakeType) => {
      modalStakeType.set(stakeType);
      open();
    },
    [open]
  );

  return { ...props, open: handleOpenModal, type };
};

export function StakeModal() {
  const { close, type } = useStakeModal();

  return (
    <ModalOverlay>
      <Modal title="Stake" onClose={close}>
        <StakeCardContent type={type} onComplete={close} />
      </Modal>
    </ModalOverlay>
  );
}
