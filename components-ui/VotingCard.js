import { useAddActivity } from "hooks/data/useActivity";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
import {
  Divider,
  Card,
  Box,
  Text,
  Bar,
  Stat,
  ButtonRow,
  Button,
  Badge,
} from "union-ui";
import format from "util/formatValue";
import { toPercent } from "util/numbers";
import useCastVote from "hooks/payables/useCastVote";
import useProposalVoteReceipt from "hooks/governance/useProposalVoteReceipt";
import { useWeb3React } from "@web3-react/core";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";

const VoteType = {
  FOR: "for",
  AGAINST: "against",
};

const statusColorMap = {
  executed: "green",
  live: "blue",
  cancelled: "red",
};

export function VotingCard({ forCount, againstCount, proposalId, status }) {
  const { account, library } = useWeb3React();
  const { data: quorum } = useProposalQuorum();
  const { data: totalSupply } = useGovernanceTokenSupply();
  const castVote = useCastVote();
  const addActivity = useAddActivity();
  const { data: voteReceipt } = useProposalVoteReceipt(account, proposalId);

  const totalCount = forCount + againstCount;
  const percentageFor = (forCount / totalCount) * 100;
  const percentageAgainst = 100 - percentageFor;

  const totalVotePercent = totalCount / totalSupply;
  const quorumPercent = quorum / totalSupply;

  const handleCastVote = (type) => async () => {
    try {
      const support = type === VoteType.FOR ? 1 : 0;
      const { hash } = await castVote(proposalId, support);

      await getReceipt(hash, library);
      addActivity(activityLabels.vote({ type, hash, proposalId }));
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.vote({ type, proposalId, hash }, true));
      handleTxError(err);
    }
  };

  const canVote = !voteReceipt?.hasVoted && status === "active";

  return (
    <Card mb="16px">
      <Card.Header
        title="Voting"
        action={
          <Badge label={status} color={statusColorMap[status] || "blue"} />
        }
      />
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
        <Box mt="22px">
          <Stat fluid label="Votes cast" value={toPercent(totalVotePercent)} />
          <Stat
            fluid
            label={`${toPercent(quorumPercent)} Quorum`}
            value={
              <Bar
                size="large"
                percentage={percentageFor}
                marker={quorumPercent * 100}
              />
            }
          />
        </Box>
        <Divider />
        <ButtonRow mt="16px">
          <Button
            fluid
            label="Vote for"
            variant="secondary"
            rounded
            color="green"
            disabled={!canVote}
            onClick={handleCastVote(VoteType.FOR)}
          />
          <Button
            fluid
            label="Vote against"
            variant="secondary"
            rounded
            color="red"
            disabled={!canVote}
            onClick={handleCastVote(VoteType.AGAINST)}
          />
        </ButtonRow>
      </Card.Body>
    </Card>
  );
}
