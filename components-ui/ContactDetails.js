import useBorrowData from "hooks/data/useBorrowData";
import PropTypes from "prop-types";
import { Text, Box, Stat, Label, Badge } from "union-ui";
import { Health, Dai } from "components-ui";
import format from "util/formatValue";
import { roundUp, toPercent } from "util/numbers";
import useAsyncActivity from "hooks/data/useAsyncActivity";
import { AccountActivity } from "./AccountActivity";

function TrustsYouContactDetails({
  address,
  used,
  utilized,
  vouched,
  isOverdue,
}) {
  const activity = useAsyncActivity(address);

  return (
    <>
      <Box mb="20px">
        <Stat label="Providing you" value={<Dai value={vouched} />} />
        <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        <Stat
          label="Available Credit"
          value={<Dai value={format(vouched - used)} />}
        />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Loan status</Label>
        {isOverdue ? (
          <Badge color="red" label="Overdue" />
        ) : (
          <Badge color="blue" label="Healthy" />
        )}
      </Box>
      <Box direction="vertical">
        <Label size="small">Account History</Label>
      </Box>
      <AccountActivity {...activity} />
    </>
  );
}

function YouTrustContactDetails({ health, address, used, utilized, vouched }) {
  const { data: borrowData } = useBorrowData(address);
  const activity = useAsyncActivity(address);

  const {
    interest = 0,
    paymentDueDate = "-",
    isOverdue = false,
  } = !!borrowData && borrowData;

  return (
    <>
      <Box mb="20px">
        <Stat label="Credit Limit" value={<Dai value={vouched} />} />
        <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        <Stat
          label="Available Credit"
          value={<Dai value={format(vouched - used)} />}
        />
      </Box>
      <Box mb="24px">
        <Stat label="Balance owed" value={<Dai value={format(used)} />} />
        <Stat label="Min payment" value={<Dai value={roundUp(interest)} />} />
        <Stat label="Payment due" value={paymentDueDate} />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Loan status</Label>
        <Health health={health} isOverdue={isOverdue} />
      </Box>
      <Box direction="vertical">
        <Label size="small">Account History</Label>
      </Box>
      <AccountActivity {...activity} />
    </>
  );
}

export function ContactDetails({ variant, ...props }) {
  return variant === "you-trust" ? (
    <YouTrustContactDetails {...props} />
  ) : (
    <TrustsYouContactDetails {...props} />
  );
}

ContactDetails.propTypes = {
  variant: PropTypes.oneOf(["you-trust", "trusts-you"]),
};

ContactDetails.defaultProps = {
  variant: "vouch",
};
