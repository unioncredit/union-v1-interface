import {
  CongratulationsModal,
  useCongratulationsModal,
  StakeModal,
  useStakeModal,
  StakeType,
} from "components-ui/modals";
import { Grid, Row, Col, Box, Card, Stat, Button, ButtonRow } from "union-ui";
import {
  Wrapper,
  ShareCard,
  BecomeMemberCard,
  CreditProvidersCard,
  Dai,
} from "components-ui";
import useIsMember from "hooks/data/useIsMember";
import useTrustCountData from "hooks/data/useTrustCountData";
import useVouchData from "hooks/data/useVouchData";
import useCreditLimit from "hooks/data/useCreditLimit";
import { config } from "./config";
import useStakeData from "hooks/data/useStakeData";

export default function MembershipView() {
  const { data: stakeData } = useStakeData();
  const { data: vouchData = [] } = useVouchData();
  const { data: creditLimit = 0 } = useCreditLimit();
  const { data: trustCount = 0 } = useTrustCountData();

  const { mutate: updateIsMember } = useIsMember();

  const { isOpen: isCongratulationsModalOpen } = useCongratulationsModal();
  const { isOpen: isStakeModalOpen, open: openStakeModal } = useStakeModal();

  const fencedTrustCount = trustCount >= 3 ? 3 : trustCount;

  const { totalStake = 0.0 } = !!stakeData && stakeData;

  const onComplete = async () => {
    await updateIsMember();
  };

  return (
    <Wrapper title={config.title}>
      <Grid gutterWidth={0}>
        <Row justify="center">
          <Col xs={12} md={8} lg={6}>
            <Card mt="24px">
              <Card.Header title="Your staked DAI" align="center" />
              <Card.Body>
                <Grid>
                  <Grid.Row>
                    <Grid.Col xs={12}>
                      <Stat
                        size="large"
                        align="center"
                        label="TOTAL STAKE"
                        value={<Dai value={totalStake} />}
                        mb="32px"
                      />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col>
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
                    </Grid.Col>
                  </Grid.Row>
                </Grid>
              </Card.Body>
            </Card>
            <Box mb="24px">
              {vouchData.length < 3 ? (
                <ShareCard
                  vouchCount={fencedTrustCount}
                  title="Get trusted on Union"
                  content="Before you can start using Union, you’ll need 3 existing members to vouch for you."
                />
              ) : (
                <BecomeMemberCard />
              )}
            </Box>
            <Box mb="24px">
              <CreditProvidersCard />
            </Box>
          </Col>
        </Row>
      </Grid>
      {isStakeModalOpen && <StakeModal />}
      {isCongratulationsModalOpen && (
        <CongratulationsModal creditLimit={creditLimit} onClose={onComplete} />
      )}
    </Wrapper>
  );
}
