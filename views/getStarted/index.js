import {
  CongratulationsModal,
  useCongratulationsModal,
  StakeModal,
  useStakeModal,
} from "components-ui/modals";
import { Grid, Row, Col, Box, Card, Stat, Button } from "union-ui";
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

export default function MembershipView() {
  const { mutate: updateIsMember } = useIsMember();
  const { data: trustCount = 0 } = useTrustCountData();
  const { data: vouchData = [] } = useVouchData();
  const { data: creditLimit = 0 } = useCreditLimit();
  const { isOpen: isCongratulationsModalOpen } = useCongratulationsModal();
  const { isOpen: isStakeModalOpen, open: openStakeModal } = useStakeModal();

  const fencedTrustCount = trustCount >= 3 ? 3 : trustCount;

  const onComplete = async () => {
    await updateIsMember();
  };

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
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
                        value={<Dai value={0} />}
                        mb="32px"
                      />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col>
                      <Button
                        label="Stake"
                        onClick={() => openStakeModal("deposit")}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <Button
                        label="Unstake"
                        variant="secondary"
                        onClick={() => openStakeModal("withdraw")}
                      />
                    </Grid.Col>
                  </Grid.Row>
                </Grid>
              </Card.Body>
            </Card>
            <Box mb="24px">
              {vouchData.length < 3 ? (
                <ShareCard vouchCount={fencedTrustCount} />
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
