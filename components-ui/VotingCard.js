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
  Label,
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
import dayjs from "dayjs";

const VoteType = {
  FOR: "for",
  AGAINST: "against",
};

const statusColorMap = {
  active: "purple",
  executed: "green",
  cancelled: "red",
  succeeded: "green",
  queued: "blue",
};

export function VotingCard({
  forCount,
  againstCount,
  proposalId,
  status,
  startTimestamp,
  endTimestamp,
}) {
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

  const votedFor = voteReceipt?.hasVoted && voteReceipt?.support;

  const votedAgainst = voteReceipt?.hasVoted && !voteReceipt?.support;

  const statusText = {
    pending: `Live ${dayjs(Number(startTimestamp) * 1000).fromNow()}`,
    active: `Live ${dayjs(Number(endTimestamp) * 1000).fromNow()}`,
    executed: "Executed",
    cancelled: "Cancelled",
    succeeded: "Succeeded",
    queued: "Queued",
  };

  const statusLabel = statusText[status] || status;

  return (
    <Card mb="16px">
      <Card.Header
        title="Voting"
        action={
          <Badge label={statusLabel} color={statusColorMap[status] || "blue"} />
        }
      />
      <Card.Body>
        <Box justify="space-between" mb="4px">
          <Label as="p" m={0}>
            For
          </Label>
          <Label as="p" m={0}>
            {format(forCount)} Votes
          </Label>
        </Box>
        <Bar percentage={percentageFor} size="large" color="green" />
        <Box justify="space-between" mt="18px" mb="4px">
          <Label as="p" m={0}>
            Against
          </Label>
          <Label as="p" m={0}>
            {format(againstCount)} Votes
          </Label>
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
                percentage={totalVotePercent * 100}
                marker={quorumPercent * 100}
              />
            }
          />
        </Box>
        <Divider my="24px" />
        {votedFor ? (
          <Text m={0} color="green500" align="center">
            You voted for
          </Text>
        ) : votedAgainst ? (
          <Text m={0} color="red500" align="center">
            You voted against
          </Text>
        ) : !canVote ? (
          <Text m={0} align="center">
            You did not vote
          </Text>
        ) : (
          <ButtonRow mt="16px">
            <Button
              fluid
              label="Vote for"
              rounded
              color="green"
              disabled={!canVote}
              onClick={handleCastVote(VoteType.FOR)}
            />
            <Button
              fluid
              label="Vote against"
              rounded
              color="red"
              disabled={!canVote}
              onClick={handleCastVote(VoteType.AGAINST)}
            />
          </ButtonRow>
        )}
      </Card.Body>
    </Card>
  );
}
