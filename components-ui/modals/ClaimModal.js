import { ModalOverlay, Box, Grid, Logo, Stat, Label, Text } from "union-ui";
import External from "union-ui/lib/icons/externalinline.svg";
import Link from "next/link";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import format from "util/formatValue";
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
                value={format(Number(rewards) + Number(unionBalance))}
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
                value={format(unionBalance)}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mb="44px"
                align="center"
                size="medium"
                label="Unclaimed"
                value={format(rewards)}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <Text align="center" mb="20px">
          <Link href="#">
            <Label as="a" size="small" color="blue500" m={0}>
              Learn more about UNION <External />
            </Label>
          </Link>
        </Text>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${format(rewards)} ${unionSymbol}`}
        />
      </Modal>
    </ModalOverlay>
  );
}
