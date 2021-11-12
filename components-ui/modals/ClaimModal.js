import { commify } from "@ethersproject/units";
import { ModalOverlay, Box, Grid, Logo, Stat } from "union-ui";
import { Modal } from "components-ui";
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
  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData } = useRewardsData();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const balance = Number(rewards) + Number(unionBalance);

  return (
    <ModalOverlay onClick={close}>
      <Modal onClose={close} size="medium">
        <Box justify="center">
          <div className="inverted-circle-logo">
            <Logo />
          </div>
        </Box>
        <Grid>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mt="20px"
                mb="24px"
                align="center"
                size="large"
                label={`${unionSymbol} Balance`}
                value={commify(balance.toFixed(4))}
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
                label="Unclaimed"
                value={commify(Number(rewards).toFixed(4))}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${commify(Number(rewards).toFixed(4))} ${unionSymbol}`}
        />
      </Modal>
    </ModalOverlay>
  );
}
