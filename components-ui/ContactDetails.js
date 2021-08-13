import useBorrowData from "hooks/data/useBorrowData";
import PropTypes from "prop-types";
import { Text, Box, Stat, Label, Badge } from "union-ui";
import { Health } from "components-ui";
import format from "util/formatValue";
import { roundUp, toPercent } from "util/numbers";

function TrustsYouContactDetails({ used, utilized, vouched, isOverdue }) {
  return (
    <>
      <Box mb="20px">
        <Stat label="Providing you" value={`DAI ${vouched}`} />
        <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        <Stat
          label="Available Credit"
          value={`DAI ${format(vouched - used)}`}
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
      <Box mb="24px" direction="vertical">
        <Label size="small">Account History</Label>
        <Text>No history</Text>
      </Box>
    </>
  );
}

function YouTrustContactDetails({ health, address, used, utilized, vouched }) {
  const { data: borrowData } = useBorrowData(address);

  const {
    interest = 0,
    paymentDueDate = "-",
    isOverdue = false,
  } = !!borrowData && borrowData;

  return (
    <>
      <Box mb="20px">
        <Stat label="Credit Limit" value={`DAI ${vouched}`} />
        <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        <Stat
          label="Available Credit"
          value={`DAI ${format(vouched - used)}`}
        />
      </Box>
      <Box mb="24px">
        <Stat label="Balance owed" value={`DAI ${format(used)}`} />
        <Stat label="Min payment" value={`DAI ${roundUp(interest)}`} />
        <Stat label="Payment due" value={paymentDueDate} />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Loan status</Label>
        <Health health={health} isOverdue={isOverdue} />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Account History</Label>
        <Text>No history</Text>
      </Box>
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
