import { formatUnits } from "@ethersproject/units";
import { ModalOverlay, Box, Grid, Stat } from "@unioncredit/ui";
import { ReactComponent as UnionLogo } from "@unioncredit/ui/lib/icons/union.svg";

import format from "util/formatValue";
import useToken from "hooks/useToken";
import useUnionSymbol from "hooks/useUnionSymbol";
import useRewardsData from "hooks/data/useRewardsData";
import { useModal, useModalOpen } from "hooks/useModal";
import useTokenBalance from "hooks/data/useTokenBalance";
import { ZERO } from "constants/variables";
import { Modal, UnwrapButton } from "components-ui";
import { ClaimButton } from "components-ui/ClaimButton";

export const CLAIM_MODAL = "claim-modal";

export const useClaimModal = () => useModal(CLAIM_MODAL);

export const useClaimModalOpen = () => useModalOpen(CLAIM_MODAL);

export function ClaimModal() {
  const { close } = useClaimModal();

  const UNION = useToken("UNION");
  const WRAPPED_UNION = useToken("WRAPPED_UNION");

  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData } = useRewardsData();
  const { data: unionBalance = ZERO } = useTokenBalance(UNION);
  const { data: wrappedUnionBalance = ZERO } = useTokenBalance(WRAPPED_UNION);

  const isOpen = useClaimModalOpen();

  if (!isOpen) return null;

  const { rewards = ZERO } = !!rewardsData && rewardsData;

  const balance = rewards.add(unionBalance);

  const rewardsView = format(formatUnits(rewards), 4);

  return (
    <ModalOverlay onClick={close}>
      <Modal onClose={close} size="medium">
        <Box justify="center" mt="32px">
          <UnionLogo width="48px" height="48px" />
        </Box>
        <Grid>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mt="20px"
                mb="24px"
                align="center"
                size="large"
                label={`Unclaimed ${unionSymbol}`}
                value={rewardsView}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mb="44px"
                align="center"
                size="medium"
                label="In wallet"
                value={format(formatUnits(unionBalance), 4)}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mb="44px"
                align="center"
                size="medium"
                label="Total Balance"
                value={format(formatUnits(balance), 4)}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${rewardsView} ${unionSymbol}`}
        />
        {wrappedUnionBalance.gt(0) && (
          <UnwrapButton
            fluid
            mt="8px"
            variant="secondary"
            label={`Unwrap ${format(
              formatUnits(wrappedUnionBalance),
              4
            )} Wrapped Union`}
          />
        )}
      </Modal>
    </ModalOverlay>
  );
}
