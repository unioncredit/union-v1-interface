import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
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
import format from "util/formatValue";
import { toPercent } from "util/numbers";

export function VotingCard({ forCount, againstCount }) {
  const { data: quorum } = useProposalQuorum();
  const { data: totalSupply } = useGovernanceTokenSupply();

  const totalCount = forCount + againstCount;
  const percentageFor = (forCount / totalCount) * 100;
  const percentageAgainst = 100 - percentageFor;

  const totalVotePercent = totalCount / totalSupply;
  const quorumPercent = quorum / totalSupply;

  return (
    <Card mb="16px">
      <Card.Header title="Voting" />
      <Card.Body>
        <Box justify="space-between">
          <Text>For</Text>
          <Text>{format(forCount)} Votes</Text>
        </Box>
        <Bar percentage={percentageFor} size="large" color="green" />
        <Box justify="space-between" mt="18px">
          <Text>Against</Text>
          <Text>{format(againstCount)} Votes</Text>
        </Box>
        <Bar percentage={percentageAgainst} size="large" />
        <Box align="flex-end" mt="22px">
          <Box direction="vertical" fluid>
            <Label as="p" size="small">
              Votes cast
            </Label>
            <Text size="large">{toPercent(totalVotePercent)}</Text>
          </Box>
          <Box direction="vertical" fluid>
            <Bar
              size="large"
              percentage={percentageFor}
              marker={quorumPercent * 100}
              markerLabel={`${toPercent(quorumPercent)} Quorum`}
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
