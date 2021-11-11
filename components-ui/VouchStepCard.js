import useTrustCountData from "hooks/data/useTrustCountData";
import { Box, Card, CircleProgress, Table } from "union-ui";
import { CreditContactsRow, CreditContactsRowSkeleton } from "components-ui";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";

import styles from "./VouchStepCard.module.css";

export function VouchStepCard() {
  const { data: trustCount = 0 } = useTrustCountData();
  const { data: vouchData } = useVouchData();

  const vouchCount = trustCount >= 3 ? 3 : trustCount;

  const isVouchLoading = !vouchData;

  return (
    <Card mb="24px" size="fluid">
      <Card.Header
        title="Get 3 vouches"
        subTitle="To become a member, you’ll need 3 existing Union members to vouch for you. These vouches will form your starting credit line within Union."
      />
      <Card.Body>
        <Box className={styles.vouchStakeCard}>
          <Box my="16px" ml="16px" mr="24px" className={styles.circleProgress}>
            <CircleProgress
              percentage={(vouchCount / 3) * 100}
              complete={vouchCount >= 3}
              label={`${vouchCount}/3`}
            />
          </Box>
          <Table>
            {isVouchLoading
              ? createArray(3).map((_, i) => (
                  <CreditContactsRowSkeleton key={i} />
                ))
              : vouchData
                  .slice(0, 3)
                  .map((item) => (
                    <CreditContactsRow key={item.address} {...item} />
                  ))}
          </Table>
        </Box>
      </Card.Body>
    </Card>
  );
}
