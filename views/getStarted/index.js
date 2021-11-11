import {
  CongratulationsModal,
  useCongratulationsModal,
  StakeModal,
  useStakeModal,
} from "components-ui/modals";
import {
  Grid,
  Row,
  Col,
  Text,
  Heading,
  ProgressList,
  ProgressListItem,
} from "union-ui";
import {
  View,
  BecomeMemberCard,
  StakeStepCard,
  VouchStepCard,
} from "components-ui";
import useIsMember from "hooks/data/useIsMember";
import useCreditLimit from "hooks/data/useCreditLimit";
import useTrustCountData from "hooks/data/useTrustCountData";
import useStakeData from "hooks/data/useStakeData";

export default function MembershipView() {
  const { data: trustCount = 0 } = useTrustCountData();
  const { data: creditLimit = 0 } = useCreditLimit();
  const { data: stakeData } = useStakeData();

  const { data: isMember, mutate: updateIsMember } = useIsMember();

  const { isOpen: isCongratulationsModalOpen } = useCongratulationsModal();
  const { isOpen: isStakeModalOpen } = useStakeModal();

  const onComplete = async () => {
    await updateIsMember();
  };

  const { totalStake = 0.0 } = !!stakeData && stakeData;

  const stakeComplete = totalStake > 0;
  const vouchComplete = trustCount >= 3;

  const completeCount = [stakeComplete, vouchComplete, isMember].reduce(
    (acc, completeness) => (completeness ? acc + 1 : acc),
    0
  );

  return (
    <View>
      <Grid gutterWidth={0}>
        <Row justify="center">
          <Col xs={12} md={8} lg={8}>
            <Heading size="large" mb="4px" mt="24px">
              Become a Union member
            </Heading>
            <Text grey={500} mb="24px">
              {completeCount} of 3 tasks completed
            </Text>
            <ProgressList>
              <ProgressListItem number={1} complete={stakeComplete}>
                <StakeStepCard />
              </ProgressListItem>
              <ProgressListItem number={2} complete={vouchComplete}>
                <VouchStepCard />
              </ProgressListItem>
              <ProgressListItem number={3} complete={isMember}>
                <BecomeMemberCard disabled={trustCount < 3} />
              </ProgressListItem>
            </ProgressList>
          </Col>
        </Row>
      </Grid>
      {isStakeModalOpen && <StakeModal />}
      {isCongratulationsModalOpen && (
        <CongratulationsModal creditLimit={creditLimit} onClose={onComplete} />
      )}
    </View>
  );
}
