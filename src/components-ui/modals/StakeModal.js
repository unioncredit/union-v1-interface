import { newRidgeState } from "react-ridge-state";
import { ModalOverlay, Grid, Stat, ToggleMenu } from "@unioncredit/ui";
import { Modal, DepositInput, WithdrawInput } from "components-ui";
import { useModal } from "hooks/useModal";
import { useCallback } from "react";

import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import format from "util/formatValue";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Dai } from "components-ui/Dai";

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

export function StakeModal() {
  const { close, type, setType } = useStakeModal();

  const UNION = useCurrentToken("UNION");
  const { mutate: updateUnionBalance } = useTokenBalance(UNION);
  const { data: stakeData, mutate: updateStakeData } = useStakeData();
  const { mutate: updateRewardsData } = useRewardsData();

  const { totalStake = 0.0, withdrawableStake = 0.0 } =
    !!stakeData && stakeData;

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
        <Grid>
          <Grid.Row>
            <Grid.Col>
              <Stat
                size="medium"
                mb="24px"
                align="center"
                label="Dai Staked"
                value={<Dai value={format(totalStake, 4)} />}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                size="medium"
                mb="24px"
                align="center"
                label="Withdrawable"
                value={<Dai value={format(withdrawableStake, 4)} />}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ToggleMenu
          fluid
          onChange={onToggleChange}
          items={toggleMenuOptions}
          initialActive={initialActiveIndex}
        />
        {type === StakeType.STAKE ? (
          <DepositInput {...{ totalStake, onComplete }} />
        ) : (
          <WithdrawInput {...{ withdrawableStake, totalStake, onComplete }} />
        )}
      </Modal>
    </ModalOverlay>
  );
}
