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
  MiniProgressList,
} from "union-ui";
import {
  View,
  BecomeMemberCard,
  StakeStepCard,
  VouchStepCard,
} from "components-ui";
import { useRef } from "react";
import useIsMember from "hooks/data/useIsMember";
import useCreditLimit from "hooks/data/useCreditLimit";
import useTrustCountData from "hooks/data/useTrustCountData";
import useStakeData from "hooks/data/useStakeData";

import styles from "./getStarted.module.css";

export default function MembershipView() {
  const stakeStep = useRef();
  const vouchStep = useRef();
  const memberStep = useRef();

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

  const miniProgressListItems = [
    { number: 1, complete: stakeComplete, scrollTo: stakeStep },
    { number: 2, complete: vouchComplete, scrollTo: vouchStep },
    { number: 3, complete: isMember, scrollTo: memberStep },
  ];

  return (
    <View>
      <Grid gutterWidth={0}>
        <Row justify="center">
          <Col xs={12} md={8} lg={8}>
            <Heading size="large" mb="4px" mt="42px">
              Become a Union member
            </Heading>
            <Text grey={500} mb="24px">
              {completeCount} of 3 tasks completed
            </Text>
            <ProgressList>
              <div ref={stakeStep}>
                <ProgressListItem number={1} complete={stakeComplete}>
                  <StakeStepCard />
                </ProgressListItem>
              </div>
              <div ref={vouchStep}>
                <ProgressListItem number={2} complete={vouchComplete}>
                  <VouchStepCard />
                </ProgressListItem>
              </div>
              <div ref={memberStep}>
                <ProgressListItem number={3} complete={isMember}>
                  <BecomeMemberCard disabled={trustCount < 3} />
                </ProgressListItem>
              </div>
            </ProgressList>
          </Col>
        </Row>
      </Grid>
      <div className={styles.miniProgressListWrapper}>
        <MiniProgressList items={miniProgressListItems} />
      </div>
      {isStakeModalOpen && <StakeModal />}
      {isCongratulationsModalOpen && (
        <CongratulationsModal creditLimit={creditLimit} onClose={onComplete} />
      )}
    </View>
  );
}
