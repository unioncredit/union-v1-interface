import PropTypes from "prop-types";
import { Heading, Text, Box, Stat, Label, Badge } from "union-ui";

function TrustsYouContactDetails({
  address,
  available,
  isOverdue,
  trust,
  used,
  utilized,
  vouched,
}) {
  return (
    <>
      <Box mb="20px">
        <Stat label="Providing you" value={`DAI ${vouched}`} />
        <Stat label="Utilized" value={`%${utilized}`} />
        <Stat label="Available Credit" value={`DAI ${vouched}`} />
      </Box>
      <Box mb="24px">
        <Stat label="You owe" value={`DAI ${used}`} />
        <Stat label="Due today" value="$28.13" />
        <Stat label="Payment due" value="~12 days" />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Trusted since</Label>
        <Heading level={3}>-</Heading>
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Loan status</Label>
        <Badge label="Healthy" color="blue" />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Account History</Label>
        <Box mt="8px" direction="vertical">
          <Text>Borrowed $250</Text>
          <Label size="small">11:14am · 22 November 2020</Label>
        </Box>
        <Box mt="8px" direction="vertical">
          ???
        </Box>
      </Box>
    </>
  );
}

function YouTrustContactDetails({ used, utilized, vouched }) {
  return (
    <>
      <Box mb="20px">
        <Stat label="Credit Limit" value={`DAI ${vouched}`} />
        <Stat label="Utilized" value={`%${utilized}`} />
        <Stat label="Available Credit" value={`DAI ${vouched}`} />
      </Box>
      <Box mb="24px">
        <Stat label="Balance owed" value={`DAI ${used}`} />
        <Stat label="Due today" value="$28.13" />
        <Stat label="Payment due" value="~12 days" />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Trusted since</Label>
        <Heading level={3}>-</Heading>
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Loan status</Label>
        <Badge label="Healthy" color="blue" />
      </Box>
      <Box mb="24px" direction="vertical">
        <Label size="small">Account History</Label>
        <Box mt="8px" direction="vertical">
          <Text>Borrowed $250</Text>
          <Label size="small">11:14am · 22 November 2020</Label>
        </Box>
        <Box mt="8px" direction="vertical">
          ???
        </Box>
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
