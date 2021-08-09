import { Card, Box, Button, Divider, Text, Label, Heading } from "union-ui";

export function UserVotingOverview() {
  return (
    <Card>
      <Card.Body>
        <Box align="center" justify="space-between">
          <Text m={0}>Voting Power</Text>
          <Button variant="pill">Delegate votes</Button>
        </Box>
        <Heading m={0}>16,000 votes</Heading>
        <Label size="small">0 delegated to you</Label>
        <Text mt="16px">Wallet balance</Text>
        <Heading m={0}>16,000 UNION</Heading>
        <Text mt="16px">Delegating to</Text>
        <Heading m={0}>Self</Heading>
        <Divider />
        <Box align="center" justify="space-between" mt="20px">
          <Text m={0}>Unclaimed Tokens</Text>
          <Button variant="pill">Claim tokens</Button>
        </Box>
        <Heading m={0}>813 UNION</Heading>
        <Label size="small">12.2 tokens per day</Label>
      </Card.Body>
    </Card>
  );
}
