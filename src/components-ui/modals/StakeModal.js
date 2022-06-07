import { useCallback } from "react";
import { newRidgeState } from "react-ridge-state";
import { ModalOverlay, ToggleMenu } from "@unioncredit/ui";

import { useModal, useModalOpen } from "hooks/useModal";
import useStakeData from "hooks/data/useStakeData";
import useToken from "hooks/useToken";
import useRewardsData from "hooks/data/useRewardsData";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Modal } from "components-ui/Modal";
import { DepositInput } from "components-ui/DepositInput";
import { WithdrawInput } from "components-ui/WithdrawInput";
import { ZERO } from "constants/variables";

export const StakeType = {
  STAKE: "stake",
  UNSTAKE: "unstake",
};

const toggleMenuOptions = [
  { id: StakeType.STAKE, label: "Stake" },
  { id: StakeType.UNSTAKE, label: "Unstake" },
];

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

  const setType = (type) => {
    modalStakeType.set(type);
  };

  return { ...props, open: handleOpenModal, type, setType };
};

const useStakeModalOpen = () => useModalOpen(STAKE_MODAL);

export function StakeModal() {
  const { close, type, setType } = useStakeModal();

  const UNION = useToken("UNION");
  const isOpen = useStakeModalOpen();
  const { mutate: updateUnionBalance } = useTokenBalance(UNION);
  const { data: stakeData, mutate: updateStakeData } = useStakeData();
  const { mutate: updateRewardsData } = useRewardsData();

  if (!isOpen) return null;

  const {
    totalStake = ZERO,
    withdrawableStake = ZERO,
    utilizedStake = ZERO,
  } = !!stakeData && stakeData;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateStakeData();
    await updateRewardsData();
  };

  const onToggleChange = (item) => {
    setType(item.id);
  };

  const initialActiveIndex = toggleMenuOptions.findIndex(
    ({ id }) => id === type
  );

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Stake or Unstake DAI" onClose={close}>
        <ToggleMenu
          fluid
          packed
          onChange={onToggleChange}
          items={toggleMenuOptions}
          initialActive={initialActiveIndex}
        />
        {type === StakeType.STAKE ? (
          <DepositInput
            totalStake={totalStake}
            withdrawableStake={withdrawableStake}
            onComplete={onComplete}
            utilizedStake={utilizedStake}
          />
        ) : (
          <WithdrawInput
            totalStake={totalStake}
            withdrawableStake={withdrawableStake}
            onComplete={onComplete}
            utilizedStake={utilizedStake}
          />
        )}
      </Modal>
    </ModalOverlay>
  );
}
