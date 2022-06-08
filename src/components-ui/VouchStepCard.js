import {
  CreditContactsRow,
  CreditContactsRowSkeleton,
  ShareCard,
} from "components-ui";
import useTrustCountData from "hooks/data/useTrustCountData";
import { Box, Card, CircleProgress, Table } from "@unioncredit/ui";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";
import useEffectiveNumber from "hooks/useEffectiveNumber";
import { ZERO } from "constants/variables";

import "./VouchStepCard.scss";

export function VouchStepCard() {
  const { data: trustCount = 0 } = useTrustCountData();
  const { data: vouchData } = useVouchData();
  const { data: effectiveNumberBn = ZERO } = useEffectiveNumber();

  const vouchCount = trustCount >= 3 ? 3 : trustCount;

  const isVouchLoading = !vouchData;

  const effectiveNumber = Number(effectiveNumberBn.toString());

  return (
    <Card mb="24px" size="fluid" className="vouchStakeCard">
      <Card.Header
        title="Get 3 vouches"
        subTitle="To become a member, you’ll need 3 existing Union members to vouch for you. These vouches will form your starting credit line within Union."
      />
      <Card.Body>
        <Box className="vouchStakeCardInner">
          <Box my="16px" ml="16px" mr="24px" className="circleProgress">
            <CircleProgress
              percentage={(vouchCount / effectiveNumber) * 100}
              complete={vouchCount >= effectiveNumber}
              label={`${vouchCount}/${effectiveNumber}`}
            />
          </Box>
          <Table>
            {isVouchLoading
              ? createArray(3).map((_, i) => (
                  <CreditContactsRowSkeleton key={i} />
                ))
              : vouchData
                  .slice(0, effectiveNumber)
                  .map((item) => (
                    <CreditContactsRow key={item.address} {...item} />
                  ))}
          </Table>
        </Box>
        <ShareCard
          buttonProps={{ variant: "primary" }}
          content="Share your vouch link with Union members who might be willing to vouch for you with their DAI."
        />
      </Card.Body>
    </Card>
  );
}
