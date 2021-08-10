import PropTypes from "prop-types";
import { Card, Box, Button, Divider, Text, Label, Heading } from "union-ui";

export function UserVotingOverview({ variant }) {
  return (
    <Card>
      <Card.Body>
        <Box align="center" justify="space-between">
          <Text m={0}>Voting Power</Text>
          {variant === "primary" && (
            <Button variant="pill">Delegate votes</Button>
          )}
        </Box>
        <Heading m={0}>16,000 votes</Heading>
        <Label size="small">0 delegated to you</Label>
        <Text mt="16px">Wallet balance</Text>
        <Heading m={0}>16,000 UNION</Heading>
        <Text mt="16px">Delegating to</Text>
        <Heading m={0}>Self</Heading>
        {variant === "primary" && (
          <>
            <Divider />
            <Box align="center" justify="space-between" mt="20px">
              <Text m={0}>Unclaimed Tokens</Text>
              <Button variant="pill">Claim tokens</Button>
            </Box>
            <Heading m={0}>813 UNION</Heading>
            <Label size="small">12.2 tokens per day</Label>
          </>
        )}

        {variant === "secondary" && (
          <Button
            icon="vouch"
            label="Delegate to this account"
            fluid
            mt="20px"
          />
        )}
      </Card.Body>
    </Card>
  );
}

UserVotingOverview.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

UserVotingOverview.defaultProps = {
  variant: "primary",
};
