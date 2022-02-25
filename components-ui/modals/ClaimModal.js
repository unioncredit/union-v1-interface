import { commify } from "@ethersproject/units";
import { ModalOverlay, Box, Grid, Stat } from "union-ui";
import UnionLogo from "union-ui/lib/icons/union.svg";
import { Modal, UnwrapButton } from "components-ui";
import { useModal } from "hooks/useModal";
import { ClaimButton } from "components-ui/ClaimButton";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useCurrentToken from "hooks/useCurrentToken";

export const CLAIM_MODAL = "claim-modal";

export const useClaimModal = () => useModal(CLAIM_MODAL);

export function ClaimModal() {
  const { close } = useClaimModal();

  const UNION = useCurrentToken("UNION");
  const WRAPPED_UNION = useCurrentToken("WRAPPED_UNION");

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
                value={commify(Number(rewards).toFixed(4))}
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
                value={commify(unionBalance.toFixed(4))}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mb="44px"
                align="center"
                size="medium"
                label="Total Balance"
                value={commify(balance.toFixed(4))}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${commify(Number(rewards).toFixed(4))} ${unionSymbol}`}
        />
        {wrappedUnionBalance > 0 && (
          <UnwrapButton
            mt="8px"
            fluid
            variant="secondary"
            label={`Unwrap ${commify(
              Number(wrappedUnionBalance).toFixed(4)
            )} Wrapped Union`}
          />
        )}
      </Modal>
    </ModalOverlay>
  );
}
