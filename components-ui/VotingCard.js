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
} from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import WireCheck from "@unioncredit/ui/lib/icons/wireCheck.svg";

import useCastVote from "hooks/payables/useCastVote";
import { useAddActivity } from "hooks/data/useActivity";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useProposalVoteReceipt from "hooks/governance/useProposalVoteReceipt";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";
import format from "util/formatValue";
import { toPercent } from "util/numbers";
import relativeTime from "util/relativeTime";

import styles from "./VotingCard.module.css";

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
  defeated: "red",
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
  const quorumProgress =
    Math.ceil(totalCount / quorum) >= 1 ? 1 : totalCount / quorum;

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

  const votingNotStarted = status === "pending";

  const canVote = !voteReceipt?.hasVoted && status === "active";

  const votedFor = voteReceipt?.hasVoted && voteReceipt?.support;

  const votedAgainst = voteReceipt?.hasVoted && !voteReceipt?.support;

  const statusText = {
    pending: `Begins ${relativeTime(Number(startTimestamp))}`,
    active: `Ends ${relativeTime(Number(endTimestamp))}`,
    executed: "Executed",
    cancelled: "Cancelled",
    succeeded: "Succeeded",
    queued: "Queued",
    defeated: "Defeated",
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
          <Stat
            fluid
            label="Votes cast"
            value={toPercent(isNaN(totalVotePercent) ? 0 : totalVotePercent)}
          />
          <Stat
            fluid
            label={
              <Label as="p" m={0} weight="medium" size="small">
                {toPercent(isNaN(quorumPercent) ? 0 : quorumPercent)} Quorum{" "}
                {quorumProgress >= 1 && (
                  <WireCheck className={styles.wireCheck} />
                )}
              </Label>
            }
            value={<Bar size="large" percentage={quorumProgress * 100} />}
          />
        </Box>
        {!votingNotStarted && (
          <>
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
          </>
        )}
      </Card.Body>
    </Card>
  );
}
