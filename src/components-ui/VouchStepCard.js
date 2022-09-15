import { Box, Card, CircleProgress, Table } from "@unioncredit/ui";

import {
  CreditContactsRow,
  CreditContactsRowSkeleton,
  ShareCard,
} from "components-ui";
import createArray from "util/createArray";
import { ZERO } from "constants/variables";
import useEffectiveNumber from "hooks/useEffectiveNumber";

import "./VouchStepCard.scss";

export function VouchStepCard({ data: vouchData = [] }) {
  const { data: effectiveNumberBn = ZERO } = useEffectiveNumber();

  const effectiveNumber = Number(effectiveNumberBn.toString());

  const vouchCount =
    vouchData.length >= effectiveNumber ? effectiveNumber : vouchData.length;

  const isVouchLoading = !vouchData;

  const s = (n, s) => (n > 1 ? s : "");

  return (
    <Card mb="24px" size="fluid" className="vouchStakeCard">
      <Card.Header
        title={`Get ${effectiveNumber} vouch${s(effectiveNumber, "es")}`}
        subTitle={`To become a member, you’ll need ${effectiveNumber} existing Union member${s(
          effectiveNumber,
          "s"
        )} to vouch for you. ${
          effectiveNumber > 1 ? "These vouches" : "This vouch"
        } will form your starting credit line within Union.`}
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
