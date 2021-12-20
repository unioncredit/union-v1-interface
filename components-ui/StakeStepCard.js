import { useStakeModal, StakeType } from "components-ui/modals";
import { Grid, Card, Stat, Button, ButtonRow, Divider } from "union-ui";
import { Dai, Union } from "components-ui";
import useStakeData from "hooks/data/useStakeData";
import useRewardsData from "hooks/data/useRewardsData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import format from "util/formatValue";

export function StakeStepCard() {
  const { data: stakeData } = useStakeData();
  const { open: openStakeModal } = useStakeModal();
  const { data: rewardsData } = useRewardsData();
  const { data: unionSymbol } = useUnionSymbol();
  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const { totalStake = 0.0 } = !!stakeData && stakeData;

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const totalUnion = Number(rewards) + Number(unionBalance);

  return (
    <Card size="fluid" mb="24px">
      <Card.Header
        title="Stake DAI to earn UNION"
        subTitle="DAI is used to back trust you provide to other Union members. Staked DAI also accumulates UNION tokens, which is required to become a member of the network."
      />
      <Card.Body>
        <Divider mb="32px" />
        <Grid>
          <Grid.Row>
            <Grid.Col xs={6}>
              <Stat
                size="large"
                align="center"
                label="TOTAL STAKE"
                value={<Dai value={totalStake} />}
                mb="32px"
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <Stat
                size="large"
                align="center"
                label={`${unionSymbol} Accrued`}
                value={<Union value={format(totalUnion, 4)} />}
                mb="32px"
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <ButtonRow fluid>
          <Button
            fluid
            label="Stake"
            onClick={() => openStakeModal(StakeType.STAKE)}
          />
          <Button
            fluid
            label="Unstake"
            variant="secondary"
            onClick={() => openStakeModal(StakeType.UNSTAKE)}
          />
        </ButtonRow>
      </Card.Body>
    </Card>
  );
}
