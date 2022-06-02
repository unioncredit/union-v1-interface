import { ModalOverlay, Box, Grid, Stat } from "@unioncredit/ui";
import { ReactComponent as UnionLogo } from "@unioncredit/ui/lib/icons/union.svg";

import format from "util/formatValue";
import { useModal } from "hooks/useModal";
import useUnionSymbol from "hooks/useUnionSymbol";
import useToken from "hooks/useToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import { Modal, UnwrapButton } from "components-ui";
import { ClaimButton } from "components-ui/ClaimButton";

export const CLAIM_MODAL = "claim-modal";

export const useClaimModal = () => useModal(CLAIM_MODAL);

export function ClaimModal() {
  const { close } = useClaimModal();

  const UNION = useToken("UNION");
  const WRAPPED_UNION = useToken("WRAPPED_UNION");

  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData } = useRewardsData();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: wrappedUnionBalance } = useTokenBalance(WRAPPED_UNION);

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const balance = Number(rewards) + Number(unionBalance);

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
                value={format(rewards, 4)}
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
                value={format(unionBalance, 4)}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mb="44px"
                align="center"
                size="medium"
                label="Total Balance"
                value={format(balance, 4)}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${format(rewards, 4)} ${unionSymbol}`}
        />
        {wrappedUnionBalance > 0 && (
          <UnwrapButton
            fluid
            mt="8px"
            variant="secondary"
            label={`Unwrap ${format(wrappedUnionBalance, 4)} Wrapped Union`}
          />
        )}
      </Modal>
    </ModalOverlay>
  );
}
