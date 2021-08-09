import {
  Divider,
  Card,
  Box,
  Text,
  Bar,
  Label,
  ButtonRow,
  Button,
} from "union-ui";

export function VotingCard() {
  return (
    <Card>
      <Card.Header title="Voting" />
      <Card.Body>
        <Box justify="space-between">
          <Text>For</Text>
          <Text>2,345,234 Votes</Text>
        </Box>
        <Bar percentage={20} size="large" color="green" />
        <Box justify="space-between" mt="18px">
          <Text>Against</Text>
          <Text>345,234 Votes</Text>
        </Box>
        <Bar percentage={20} size="large" />
        <Box align="flex-end" mt="22px">
          <Box direction="vertical" fluid>
            <Label as="p" size="small">
              Votes cast
            </Label>
            <Text size="large">13.8%</Text>
          </Box>
          <Box direction="vertical" fluid>
            <Bar
              size="large"
              percentage={30}
              marker={40}
              markerLabel="40% Quorum"
            />
          </Box>
        </Box>
        <Divider />
        <ButtonRow mt="16px">
          <Button
            fluid
            label="for"
            icon="check"
            variant="secondary"
            rounded
            color="green"
          />
          <Button
            fluid
            label="against"
            icon="no"
            variant="secondary"
            rounded
            color="red"
          />
        </ButtonRow>
      </Card.Body>
    </Card>
  );
}

